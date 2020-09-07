/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create role"
        @close="onClose">
        <template #body>
            <UserRoleForm
                submit-title="CREATE"
                proceed-title="CREATE AND EDIT"
                :is-submitting="isSubmitting"
                :is-proceeding="isProceeding"
                @submit="onSubmit"
                @proceed="onProceed" />
        </template>
    </ModalForm>
</template>

<script>
import ModalForm from '@Core/components/Modal/ModalForm';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    THEME,
} from '@Core/defaults/theme';
import UserRoleForm from '@Users/components/Forms/UserRoleForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CreateRoleModalForm',
    components: {
        ModalForm,
        UserRoleForm,
    },
    data() {
        return {
            isSubmitting: false,
            isProceeding: false,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('role', [
            'createRole',
            '__clearStorage',
        ]),
        async onSubmit() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            await this.createRole({
                onSuccess: this.onCreateRoleSuccess,
                onError: this.onCreateRoleError,
            });
        },
        async onProceed() {
            if (this.isSubmitting || this.isProceeding) {
                return;
            }

            this.isProceeding = true;

            this.removeErrors();
            await this.createRole({
                onSuccess: this.onCreateAndEditRoleSuccess,
                onError: this.onCreateRoleError,
            });
        },
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        async onCreateRoleSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Role created',
            });

            this.isSubmitting = false;

            this.$emit('created');
            this.onClose();
        },
        async onCreateAndEditRoleSuccess(id) {
            this.isProceeding = false;

            await this.$router.push({
                name: 'user-role-id-general',
                params: {
                    id,
                },
            });
        },
        onCreateRoleError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
            this.isProceeding = false;
        },
    },
};
</script>
