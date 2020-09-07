/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserRoleForm
                @submit="onSubmit"
                submit-title="SAVE CHANGES"
                :is-submitting="isSubmitting"
                @submit="onSubmit" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
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
    data() {
        return {
            isSubmitting: false,
        };
    },
    methods: {
        ...mapActions('role', [
            'updateRole',
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
            await this.updateRole({
                onSuccess: this.onCreateUnitSuccess,
                onError: this.onCreateUnitError,
            });
        },
        async onCreateRoleSuccess() {
            await this.getDictionary({
                dictionaryName: 'units',
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
