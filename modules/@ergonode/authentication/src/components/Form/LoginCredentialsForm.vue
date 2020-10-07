/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        submit-title="LOG IN"
        :is-submitting="isSubmitting"
        :errors="scopeErrors"
        @submit="onSubmit">
        <template #header>
            <div class="logo-header">
                <IconLogoName />
            </div>
        </template>
        <template #body>
            <TextField
                data-cy="login-email"
                v-model="email"
                :error-messages="scopeErrors.username"
                label="E-mail" />
            <TextField
                data-cy="login-pass"
                v-model="password"
                :input="passwordInputType"
                :error-messages="scopeErrors.password"
                label="Password" />
            <Toggler
                v-model="isPasswordVisible"
                label="Show password" />
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Form/LoginForm';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import TextField from '@Core/components/TextField/TextField';
import Toggler from '@Core/components/Toggler/Toggler';
import {
    INPUT_TYPE,
} from '@Core/defaults/theme';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'LoginCredentialsForm',
    components: {
        LoginForm,
        TextField,
        Toggler,
        IconLogoName,
    },
    mixins: [
        scopeErrorsMixin,
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
        onLoginSuccess() {
            this.$router.push({
                name: 'dashboard',
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
    .logo-header {
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>
