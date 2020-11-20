/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryForm
                :submit-title="$t('core.buttons.submit')"
                :is-submitting="isSubmitting"
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CategoryForm from '@Categories/components/Forms/CategoryForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CategoryGeneralTab',
    components: {
        CategoryForm,
        CenterViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('category', [
            'updateCategory',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateCategory({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category has been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
