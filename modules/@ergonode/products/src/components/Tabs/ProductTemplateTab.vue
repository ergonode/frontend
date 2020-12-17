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
                            :language="language" />
                    </TitleBarSubActions>
                    <RestoreProductButton
                        :language="language"
                        :elements="elements"
                        @resored="onRestoredDraftValues" />
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
            <Button
                :title="$t('core.buttons.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </CenterViewTemplate>
    </IntersectionObserver>
</template>

<script>
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import ProductWorkflowActionButton from '@Products/components/Buttons/ProductWorkflowActionButton';
import RestoreProductButton from '@Products/components/Buttons/RestoreProductButton';
import ProductTemplateForm from '@Products/components/Forms/ProductTemplateForm';
import ProductCompleteness from '@Products/components/Progress/ProductCompleteness';
import Button from '@UI/components/Button/Button';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
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
        LanguageTreeSelect,
        RestoreProductButton,
        IntersectionObserver,
        Preloader,
        IconSpinner,
        Button,
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
            elements: [],
            completeness: {
                missing: [],
                filled: 0,
                required: 0,
            },
            prevTemplateId: null,
            isFetchingData: false,
            language: {},
            languageCode: '',
            isSubmitting: false,
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
        ]),
    },
    created() {
        this.languageCode = this.defaultLanguageCode;
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
                        : this.languageCode;

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
        async onSelectLanguage(value) {
            const languageCode = value.code;

            await this.getProductTemplateData(languageCode);

            this.language = value;
        },
        async onRestoredDraftValues() {
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
                this.getProductDraft({
                    languageCode: this.languageCode,
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
                languageCode: this.languageCode,
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
