/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('@Authentication.authentication.components.PasswordRecoveryCheckEmail.redirectTo')"
        @submit="onRedirectToLogin">
        <template #header>
            <Fab @click.native="onBack">
                <template #icon="{ color }">
                    <IconArrowPointer :fill-color="color" />
                </template>
            </Fab>
            <FormHeader :title="$t('@Authentication.authentication.components.PasswordRecoveryCheckEmail.title')" />
        </template>
        <template #body>
            <Paragraph :title="$t('@Authentication.authentication.components.PasswordRecoveryCheckEmail.info')" />
            <Paragraph :title="$t('@Authentication.authentication.components.PasswordRecoveryCheckEmail.infoText')">
                <template #infoLink>
                    <a
                        class="paragraph__link"
                        aria-label="Paragraph link"
                        v-text="$t('@Authentication.authentication.components.PasswordRecoveryCheckEmail.infoLink')"
                        @click="onRedirectToHelp" />
                </template>
            </Paragraph>
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';

export default {
    name: 'PasswordRecoveryCheckEmail',
    components: {
        LoginForm,
    },
    methods: {
        onBack() {
            this.$emit('redirect-to', LOGIN_STATE.PASSWORD_RECOVERY);
        },
        onRedirectToLogin() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
        onRedirectToHelp() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
        },
    },
};
</script>

<style lang="scss" scoped>
    .paragraph__link {
        text-decoration: underline;
        cursor: pointer;
    }
</style>
