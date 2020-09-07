/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate :fixed="true">
        <template #centeredContent>
            <UserRoleForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="SAVE CHANGES"
                        type="submit">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </UserRoleForm>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import UserRoleForm from '@Users/components/Forms/UserRoleForm';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RoleGeneralTab',
    components: {
        Button,
        IconSpinner,
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

            try {
                this.removeErrors();
                await this.updateRole();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmitting = false;
            }
        },
    },
};
</script>
