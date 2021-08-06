/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        data-cy="help-form"
        :submit-title="$t('@Authentication.authentication.components.LoginHelpForm.redirectTo')"
        @submit="onRedirect">
        <template #header>
            <Fab @click.native="onRedirect">
                <template #icon="{ color }">
                    <IconArrowPointer :fill-color="color" />
                </template>
            </Fab>
            <FormHeader :title="$t('@Authentication.authentication.components.LoginHelpForm.title')" />
        </template>
        <template #body>
            <Paragraph :title="$t('@Authentication.authentication.components.LoginHelpForm.info')" />
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';

export default {
    name: 'LoginHelpForm',
    components: {
        LoginForm,
    },
    methods: {
        onRedirect() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
    },
};
</script>

<style lang="scss" scoped>
    .email-icon {
        margin-right: 8px;
    }
</style>
