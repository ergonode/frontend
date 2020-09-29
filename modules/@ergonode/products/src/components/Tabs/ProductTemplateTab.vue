/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
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
                    <ProductWorkflowActionButton :language="language" />
                </TitleBarSubActions>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="RESTORE"
                    :disabled="!isUserAllowedToRestore"
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
            <ProductTemplateForm
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
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconRestore from '@Core/components/Icons/Actions/IconRestore';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import TreeSelect from '@Core/components/Inputs/Select/Tree/TreeSelect';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import TitleBarSubActions from '@Core/components/TitleBar/TitleBarSubActions';
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
import ProductTemplateForm from '@Products/components/Form/ProductTemplateForm';
import ProductCompleteness from '@Products/components/Progress/ProductCompleteness';
import PRIVILEGES from '@Products/config/privileges';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateTab',
    components: {
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
    async asyncData({
        store,
        params: {
            id,
        },
    }) {
        const {
            defaultLanguageCode,
        } = store.state.core;

        const [
            templateResponse,
            completenessResponse,
        ] = await Promise.all([
            store.dispatch('product/getProductTemplate', {
                languageCode: defaultLanguageCode,
                id,
            }),
            store.dispatch('product/getProductCompleteness', {
                languageCode: defaultLanguageCode,
                id,
            }),
            store.dispatch('product/getProductDraft', {
                languageCode: defaultLanguageCode,
                id,
            }),
            store.dispatch('product/getProductWorkflow', {
                languageCode: defaultLanguageCode,
                id,
            }),
        ]);

        return {
            elements: templateResponse,
            completeness: completenessResponse,
        };
    },
    data() {
        return {
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
        isUserAllowedToRestore() {
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
        async onLanguageChange(value) {
            const languageCode = value.code;

            const [
                templateResponse,
                completenessResponse,
            ] = await Promise.all([
                this.getProductTemplate({
                    languageCode,
                    id: this.id,
                }),
                this.getProductCompleteness({
                    languageCode,
                    id: this.id,
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

            this.elements = templateResponse;
            this.completeness = completenessResponse;
            this.language = value;
        },
        async onRestoreDraftValues() {
            const {
                code: languageCode,
            } = this.language;

            const [
                completeness,
            ] = await Promise.all([
                this.getProductCompleteness({
                    languageCode,
                    id: this.id,
                }),
                this.getProductDraft({
                    languageCode,
                    id: this.id,
                }),
            ]);

            this.completeness = completeness;
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

            this.completeness = await this.getProductCompleteness({
                languageCode: this.language.code,
                id: this.id,
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
