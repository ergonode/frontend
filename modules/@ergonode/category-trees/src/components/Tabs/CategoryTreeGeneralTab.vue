/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <CategoryTreeForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                :errors="errors"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import CategoryTreeForm from '@Trees/components/Forms/CategoryTreeForm';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeGeneralTab',
    components: {
        CategoryTreeForm,
        CenterViewTemplate,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('validations', {
            errors: state => state.errors.categoryTreeGeneralTab,
        }),
    },
    methods: {
        ...mapActions('categoryTree', [
            'updateCategoryTree',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.updateCategoryTree({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree updated',
            });

            this.isSubmitting = false;
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
