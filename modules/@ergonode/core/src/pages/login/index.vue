/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Login
        @redirect-to="onRedirectTo">
        <Component
            :is="loginFormComponents.loginFormComponent"
            @redirect-to="onRedirectTo" />
        <img
            class="login__infographic"
            :src="loginFormComponents.formImage">
    </Login>
</template>

<script>
import {
    TOKEN_KEY,
} from '@Authentication/defaults/cookies';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import Login from '@UI/components/Layout/Login';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LoginPage',
    components: {
        Login,
    },
    data() {
        return {
            loginState: LOGIN_STATE.CREDENTIALS,
        };
    },
    computed: {
        ...mapState('authentication', [
            'isLogged',
        ]),
        loginFormComponents() {
            switch (this.loginState) {
            case LOGIN_STATE.CREDENTIALS:
                return {
                    loginFormComponent: () => import('@Authentication/components/Forms/LoginCredentialsForm'),
                    formImage: require('@Core/assets/images/login/login_face.png'),
                };
            case LOGIN_STATE.HELP:
                return {
                    loginFormComponent: () => import('@Authentication/components/Forms/LoginHelpForm'),
                    formImage: require('@Core/assets/images/login/login_help_face.png'),
                };
            case LOGIN_STATE.PASSWORD_RECOVERY:
                return {
                    loginFormComponent: () => import('@Authentication/components/Forms/PasswordRecoveryForm'),
                    formImage: require('@Core/assets/images/login/login_password_recovery_face.png'),
                };
            case LOGIN_STATE.CHECK_EMAIL:
                return {
                    loginFormComponent: () => import('@Authentication/components/Forms/PasswordRecoveryCheckEmail'),
                    formImage: require('@Core/assets/images/login/login_password_recovery_face.png'),
                };
            default: return null;
            }
        },
    },
    created() {
        const {
            loginState = null,
            alert = null,
        } = this.$route.params;

        if (!this.isLogged) {
            this.$cookies.remove(TOKEN_KEY);
            this.resetState();
        }

        if (loginState) {
            this.loginState = loginState;
        }

        if (alert) {
            console.log(alert);
            this.$addAlert(alert);
        }
    },
    methods: {
        ...mapActions([
            'resetState',
        ]),
        onRedirectTo(state) {
            this.loginState = state;
        },
    },
    layout: 'login',
};
</script>
