/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver @intersect="onIntersect">
        <CenterViewTemplate :fixed="true">
            <template #header>
                <div class="view-template-header__section">
                    <TreeSelect
                        :style="{ flex: '0 0 192px' }"
                        :value="language"
                        :size="smallSize"
                        label="Edit language"
                        :options="languageOptions"
                        @input="onLanguageChange" />
                </div>
                <div class="view-template-header__section">
                    <ProductCompleteness :completeness="completeness" />
                    <TitleBarSubActions>
                        <ProductWorkflowActionButton
                            v-if="status"
                            :language="language" />
                    </TitleBarSubActions>
                    <RestoreProductButton
                        :language="language"
                        :elements="elements"
                        @restored="onRestoredProductValues" />
                </div>
            </template>
            <template #centeredContent>
                <Preloader v-if="isFetchingData" />
                <ProductTemplateForm
                    v-else
                    :language="language"
                    :elements="elements"
                    :scope="scope"
                    :change-values="changeValues"
                    :errors="errors"
                    @input="onValueChange" />
            </template>
            <UpdateProductTemplateButton
                :scope="scope"
                :attributes="attributes"
                @updated="onProductTemplateUpdated" />
        </CenterViewTemplate>
    </IntersectionObserver>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ProductWorkflowActionButton from '@Products/components/Buttons/ProductWorkflowActionButton';
import RestoreProductButton from '@Products/components/Buttons/RestoreProductButton';
import UpdateProductTemplateButton from '@Products/components/Buttons/UpdateProductTemplateButton';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';
import ProductCompleteness from '@Products/components/Progress/ProductCompleteness';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import Preloader from '@UI/components/Preloader/Preloader';
import TreeSelect from '@UI/components/Select/Tree/TreeSelect';
import TitleBarSubActions from '@UI/components/TitleBar/TitleBarSubActions';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
        UpdateProductTemplateButton,
        RestoreProductButton,
        IntersectionObserver,
        Preloader,
        ProductTemplateForm,
        CenterViewTemplate,
        TreeSelect,
        TitleBarSubActions,
        ProductCompleteness,
        ProductWorkflowActionButton,
    },
    mixins: [
        gridModalMixin,
        tabFeedbackMixin,
    ],
    data() {
        return {
            elements: [],
            completeness: {
                missing: [],
                filled: 0,
                required: 0,
            },
            prevTemplateId: null,
            isFetchingData: false,
            language: {},
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', [
            'defaultLanguageCode',
            'languagesTree',
        ]),
        ...mapState('product', [
            'id',
            'template',
            'status',
            'drafts',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        languageOptions() {
            return this.languagesTree.map(language => ({
                ...language,
                key: language.code,
                value: language.name,
                disabled: this.languagePrivileges[language.code]
                    ? !this.languagePrivileges[language.code].read
                    : true,
            }));
        },
        attributes() {
            return this.elements.reduce((prev, curr) => {
                const tmp = prev;
                tmp[curr.properties.attribute_code] = curr.properties.attribute_id;
                return tmp;
            }, {});
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languageCode => languageCode.code === this.defaultLanguageCode);
    },
    methods: {
        ...mapActions('product', [
            'validateProduct',
            'setDraftValue',
            'getInheritedProduct',
            'getProductWorkflow',
            'getProductTemplate',
            'getProductCompleteness',
        ]),
        onProductTemplateUpdated() {
            this.getProductCompleteness({
                languageCode: this.language.code,
                id: this.id,
                onSuccess: (({
                    completeness,
                }) => {
                    this.completeness = completeness;
                }),
            });
        },
        async onIntersect(isIntersecting) {
            if (isIntersecting) {
                if (this.template !== this.prevTemplateId) {
                    this.isFetchingData = true;

                    const languageCode = this.prevTemplateId === null
                        ? this.defaultLanguageCode
                        : this.language.code;

                    await this.getProductTemplateData(languageCode);

                    this.isFetchingData = false;
                }
            } else {
                this.prevTemplateId = this.template;
            }
        },
        async getProductTemplateData(languageCode) {
            const requests = [
                this.getProductTemplate({
                    languageCode,
                    id: this.id,
                    onSuccess: (({
                        elements,
                    }) => {
                        this.elements = elements;
                    }),
                }),
                this.getProductCompleteness({
                    languageCode,
                    id: this.id,
                    onSuccess: (({
                        completeness,
                    }) => {
                        this.completeness = completeness;
                    }),
                }),
                this.getProductWorkflow({
                    languageCode,
                    id: this.id,
                }),
            ];

            if (typeof this.drafts[languageCode] === 'undefined') {
                requests.push(
                    this.getInheritedProduct({
                        id: this.id,
                        languageCode,
                    }),
                );
            }

            await Promise.all(requests);
        },
        async onLanguageChange(value) {
            const languageCode = value.code;

            await this.getProductTemplateData(languageCode);

            this.language = value;
        },
        async onRestoredProductValues() {
            const {
                code: languageCode,
            } = this.language;

            await Promise.all([
                this.getProductCompleteness({
                    languageCode,
                    id: this.id,
                    onSuccess: (({
                        completeness,
                    }) => {
                        this.completeness = completeness;
                    }),
                }),
                this.getInheritedProduct({
                    id: this.id,
                    languageCode,
                }),
            ]);
        },
        async onValueChange(payload) {
            this.setDraftValue({
                languageCode: payload.languageCode,
                key: payload.code,
                value: payload.value,
            });

            await this.validateProduct({
                ...payload,
                scope: this.scope,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
    .view-template-header__section {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 24px;
    }
</style>
