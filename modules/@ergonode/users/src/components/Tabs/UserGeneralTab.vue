/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserForm
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import UserForm from '@Users/components/Forms/UserForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UserGeneralTab',
    components: {
        CenterViewTemplate,
        UserForm,
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('user', [
            'updateUser',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        async onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            await this.updateUser({
                onSuccess: this.onCreateUnitSuccess,
                onError: this.onCreateUnitError,
            });
        },
        async onCreateRoleSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'User updated',
            });

            this.isSubmitting = false;
        },
        onCreateRoleError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
