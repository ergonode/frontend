/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <IntersectionObserver @intersect="onIntersect">
        <CenterViewTemplate :fixed="true">
            <template #header>
                <div class="view-template-header__section">
                    <LanguageTreeSelect
                        :style="{ flex: '0 0 192px' }"
                        label="Edit language"
                        :value="languageCode"
                        @input="onSelectLanguage" />
                </div>
                <div class="view-template-header__section">
                    <ProductCompleteness :completeness="completeness" />
                    <TitleBarSubActions>
                        <ProductWorkflowActionButton
                            v-if="status"
                            :language-code="languageCode" />
                    </TitleBarSubActions>
                    <RestoreProductButton
                        :language-code="languageCode"
                        :elements="elements"
                        @restored="onRestoredProductValues" />
                </div>
            </template>
            <template #centeredContent>
                <Preloader v-if="isFetchingData" />
                <ProductTemplateForm
                    v-else
                    :language-code="languageCode"
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
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
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
import TitleBarSubActions from '@UI/components/TitleBar/TitleBarSubActions';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
        UpdateProductTemplateButton,
        LanguageTreeSelect,
        RestoreProductButton,
        IntersectionObserver,
        Preloader,
        ProductTemplateForm,
        CenterViewTemplate,
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
            templates: {},
            completeness: {
                missing: [],
                filled: 0,
                required: 0,
            },
            prevTemplateId: null,
            isFetchingData: false,
            languageCode: '',
        };
    },
    computed: {
        ...mapState('authentication', {
            languagePrivileges: state => state.user.languagePrivileges,
        }),
        ...mapState('core', [
            'defaultLanguageCode',
        ]),
        ...mapState('product', [
            'id',
            'template',
            'status',
            'drafts',
        ]),
        elements() {
            return this.templates[this.languageCode] || [];
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
        this.languageCode = this.defaultLanguageCode;
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
                languageCode: this.languageCode,
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
                        : this.languageCode;

                    await this.getProductTemplateData(languageCode);

                    this.isFetchingData = false;
                }
            } else {
                this.prevTemplateId = this.template;
            }
        },
        async getProductTemplateData(languageCode) {
            const requests = [
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

            if (typeof this.templates[languageCode] === 'undefined') {
                requests.push(
                    this.getProductTemplate({
                        languageCode,
                        id: this.id,
                        onSuccess: (({
                            elements,
                        }) => {
                            this.templates = {
                                ...this.templates,
                                [languageCode]: elements,
                            };
                        }),
                    }),
                );
            }

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
        async onSelectLanguage(value) {
            await this.getProductTemplateData(value);

            this.languageCode = value;
        },
        async onRestoredProductValues() {
            await Promise.all([
                this.getProductCompleteness({
                    languageCode: this.languageCode,
                    id: this.id,
                    onSuccess: (({
                        completeness,
                    }) => {
                        this.completeness = completeness;
                    }),
                }),
                this.getInheritedProduct({
                    id: this.id,
                    languageCode: this.languageCode,
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
