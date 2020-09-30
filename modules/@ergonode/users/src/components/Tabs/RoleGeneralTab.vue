/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserRoleForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                :scope="scope"
                :errors="errors"
                :changed-values="changeValues"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import UserRoleForm from '@Users/components/Forms/UserRoleForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RoleGeneralTab',
    components: {
        CenterViewTemplate,
        UserRoleForm,
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
        ...mapActions('role', [
            'updateRole',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateRole({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Role has been updated',
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
