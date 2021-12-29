/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Login @redirect-to="onRedirectTo">
        <template #form>
            <Component
                :is="passwordResetFormComponents.formComponent"
                @redirect-to="onRedirectTo" />
        </template>
        <Infographic
            :bg-url="passwordResetFormComponents.bgUrl"
            :bg-position="passwordResetFormComponents.bgPosition" />
    </Login>
</template>

<script>
import NewPasswordForm from '@Authentication/components/Forms/NewPasswordForm';
import Infographic from '@Authentication/components/Infographic/Infographic';
import Login from '@Authentication/components/Layout/Login';
import {
    ROUTE_NAME,
} from '@Authentication/config/routes';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';

export default {
    name: 'PasswordReset',
    components: {
        NewPasswordForm,
        Login,
        Infographic,
    },
    async fetch({
        app,
        store,
        route,
        redirect,
    }) {
        await store.dispatch('authentication/passwordRecoveryCheckToken', {
            token: route.query.token,
            onError: () => {
                redirect({
                    name: ROUTE_NAME.INDEX,
                    params: {
                        loginState: LOGIN_STATE.CREDENTIALS,
                        alert: {
                            type: ALERT_TYPE.ERROR,
                            message: app.i18n.t('@Authentication.authentication.pages.passwordReset.alertError'),
                        },
                    },
                });
            },
        });
    },
    computed: {
        passwordResetFormComponents() {
            return {
                formComponent: NewPasswordForm,
                bgUrl: require('@Authentication/assets/images/infographics/shield-man.svg'),
                bgPosition: {
                    vertical: 'calc(50% - 8px)',
                    horizontal: '10px',
                },
            };
        },
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
