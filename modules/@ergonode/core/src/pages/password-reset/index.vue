/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Login @redirect-to="onRedirectTo">
        <NewPasswordForm />
        <img
            class="login__infographic"
            :src="require('@Core/assets/images/login/login_new_password_face.png')">
    </Login>
</template>

<script>
import NewPasswordForm from '@Authentication/components/Forms/NewPasswordForm';
import Login from '@Authentication/components/Layout/Login';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import {
    ROUTE_NAME,
} from '@Core/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';

export default {
    name: 'PasswordReset',
    components: {
        NewPasswordForm,
        Login,
    },
    async fetch({
        store,
        route,
    }) {
        await store.dispatch('authentication/passwordRecoveryCheckHash', {
            hash: route.query.hash,
            onError: () => {
                this.$router.push({
                    name: ROUTE_NAME.INDEX,
                    params: {
                        loginState: LOGIN_STATE.CREDENTIALS,
                        alert: {
                            type: ALERT_TYPE.ERROR,
                            message: this.$t('authentication.forms.newPassword.alertError'),
                        },
                    },
                });
            },
        });
    },
    methods: {
        onRedirectTo(loginState) {
            this.$router.push({
                name: ROUTE_NAME.INDEX,
                params: {
                    loginState,
                },
            });
        },
    },
    layout: 'login',
};
</script>
