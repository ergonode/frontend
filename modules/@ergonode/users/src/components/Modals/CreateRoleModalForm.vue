/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ModalForm
        title="Create role"
        @close="onClose">
        <template #body>
            <UserRoleForm @submit="onSubmit">
                <template #submitForm>
                    <Button
                        title="CREATE"
                        type="submit">
                        <template
                            v-if="isSubmitting"
                            #append="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
                <template #cancelForm>
                    <Button
                        title="CREATE & EDIT"
                        :theme="secondaryTheme"
                        @click.native="onCreateAndEdit">
                        <template
                            v-if="isCreatingAndEdit"
                            #prepend="{ color }">
                            <IconSpinner :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </UserRoleForm>
        </template>
    </ModalForm>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import ModalForm from '@Core/components/Modal/ModalForm';
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
        Button,
        IconSpinner,
        UserRoleForm,
    },
    data() {
        return {
            isSubmitting: false,
            isCreatingAndEdit: false,
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
            if (this.isSubmitting || this.isCreatingAndEdit) {
                return;
            }
            this.isSubmitting = true;

            try {
                this.removeValidationErrors();
                await this.createRole();
                this.$emit('created');
                this.onClose();
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isSubmitting = false;
            }
        },
        onClose() {
            this.__clearStorage();
            this.$emit('close');
        },
        async onCreateAndEdit() {
            this.isCreatingAndEdit = true;

            try {
                this.removeValidationErrors();
                const id = await this.createRole();
                await this.$router.push({
                    name: 'user-role-id-general',
                    params: {
                        id,
                    },
                });
            } catch (e) {
                if (e.data) {
                    this.onError(e.data);
                }
            } finally {
                this.isCreatingAndEdit = false;
            }
        },
    },
};
</script>
