/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        data-cy="login-form"
        :submit-title="$t('@Authentication.authentication.components.LoginCredentialsForm.button')"
        :is-submitting="isSubmitting"
        :errors="scopeErrors"
        @submit="onSubmit">
        <template #header>
            <IconLogoName class="header-logo" />
        </template>
        <template #body>
            <TextField
                data-cy="login-email"
                v-model="email"
                :error-messages="scopeErrors.username"
                :label="$t('@Authentication.authentication.components.LoginCredentialsForm.email')" />
            <TextField
                data-cy="login-pass"
                v-model="password"
                :input="passwordInputType"
                :error-messages="scopeErrors.password"
                :label="$t('@Authentication.authentication.components.LoginCredentialsForm.password')" />
            <div class="login-help-area">
                <Toggler
                    v-model="isPasswordVisible"
                    data-cy="show-password"
                    :label="$t('@Authentication.authentication.components.LoginCredentialsForm.toggle')" />
                <LinkButton
                    data-cy="forgot-password"
                    :title="$t('@Authentication.authentication.components.LoginCredentialsForm.forgot')"
                    @click.native="redirectToRecovery" />
            </div>
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'LoginCredentialsForm',
    components: {
        LoginForm,
        IconLogoName,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            email: '',
            password: '',
            isPasswordVisible: false,
            isSubmitting: false,
        };
    },
    computed: {
        passwordInputType() {
            return {
                type: this.isPasswordVisible ? 'text' : 'password',
            };
        },
        underlineInputType() {
            return INPUT_TYPE.UNDERLINE;
        },
    },
    methods: {
        ...mapActions('authentication', [
            'authenticateUser',
        ]),
        redirectToRecovery() {
            this.removeScopeErrors(this.scope);
            this.$emit('redirect-to', LOGIN_STATE.PASSWORD_RECOVERY);
        },
        onSubmit() {
            this.isSubmitting = true;

            const data = {
                username: this.email,
                password: this.password,
            };

            this.removeScopeErrors(this.scope);

            this.authenticateUser({
                data,
                scope: this.scope,
                onSuccess: this.onLoginSuccess,
                onError: this.onLoginError,
            });
        },
        async onLoginSuccess() {
            const extendedRedirectName = await this.$getExtendMethod('@Authentication/components/Forms/LoginCredentialsForm/redirectName', {
                $this: this,
            });
            const redirectName = [].concat(...extendedRedirectName);

            this.$router.push({
                name: redirectName[redirectName.length - 1],
            });

            this.isSubmitting = false;
        },
        onLoginError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .header-logo {
        flex: 1;
    }

    .login-help-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
