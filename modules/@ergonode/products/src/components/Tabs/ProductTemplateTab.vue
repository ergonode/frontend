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
                    <Button
                        :theme="secondaryTheme"
                        :size="smallSize"
                        title="RESTORE"
                        :disabled="!isAllowedToRestore"
                        @click.native="onShowModal">
                        <template #prepend="{ color }">
                            <IconRestore :fill-color="color" />
                        </template>
                    </Button>
                </div>
                <RestoreAttributeParentModalForm
                    v-if="isModalVisible"
                    :language="language"
                    :elements="elements"
                    @restore="onRestoreDraftValues"
                    @close="onCloseModal" />
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
            <template #default>
                <Button
                    title="SAVE CHANGES"
                    :floating="{ bottom: '24px', right: '24px' }"
                    @click.native="onSubmit">
                    <template
                        v-if="isSubmitting"
                        #prepend="{ color }">
                        <IconSpinner :fill-color="color" />
                    </template>
                </Button>
            </template>
        </CenterViewTemplate>
    </IntersectionObserver>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ProductWorkflowActionButton from '@Products/components/Buttons/ProductWorkflowActionButton';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';
import ProductCompleteness from '@Products/components/Progress/ProductCompleteness';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconRestore from '@UI/components/Icons/Actions/IconRestore';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import IntersectionObserver from '@UI/components/Observers/IntersectionObserver';
import Preloader from '@UI/components/Preloader/Preloader';
import TreeSelect from '@UI/components/Select/Tree/TreeSelect';
import TitleBarSubActions from '@UI/components/TitleBar/TitleBarSubActions';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
        IntersectionObserver,
        Preloader,
        IconSpinner,
        Button,
        IconRestore,
        ProductTemplateForm,
        CenterViewTemplate,
        TreeSelect,
        TitleBarSubActions,
        ProductCompleteness,
        ProductWorkflowActionButton,
        RestoreAttributeParentModalForm: () => import('@Products/components/Modals/RestoreAttributeParentModalForm'),
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
            isSubmitting: false,
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
        ]),
        ...mapGetters('core', [
            'rootLanguage',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
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
        isAllowedToRestore() {
            const {
                code,
            } = this.language;

            return this.$hasAccess([
                PRIVILEGES.PRODUCT.update,
            ])
                && this.languagePrivileges[code].edit
                && this.rootLanguage.code !== code;
        },
    },
    created() {
        this.language = this.languageOptions
            .find(languageCode => languageCode.code === this.defaultLanguageCode);
    },
    methods: {
        ...mapActions('product', [
            'updateProductDraft',
            'setDraftValue',
            'getProductWorkflow',
            'getProductDraft',
            'getProductTemplate',
            'getProductCompleteness',
            'applyProductDraft',
        ]),
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
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.applyProductDraft({
                id: this.id,
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product has been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        async getProductTemplateData(languageCode) {
            await Promise.all([
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
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
                this.getProductWorkflow({
                    languageCode,
                    id: this.id,
                }),
            ]);
        },
        async onLanguageChange(value) {
            const languageCode = value.code;

            await this.getProductTemplateData(languageCode);

            this.language = value;
        },
        async onRestoreDraftValues() {
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
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
            ]);
        },
        async onValueChange(payload) {
            this.setDraftValue({
                languageCode: payload.languageCode,
                key: payload.code,
                value: payload.value,
            });

            await this.updateProductDraft({
                ...payload,
                scope: this.scope,
            });

            await this.getProductCompleteness({
                languageCode: this.language.code,
                id: this.id,
                onSuccess: (({
                    completeness,
                }) => {
                    this.completeness = completeness;
                }),
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
