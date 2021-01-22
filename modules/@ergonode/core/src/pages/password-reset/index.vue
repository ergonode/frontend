/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Login @redirect-to="onRedirectTo">
        <template #form>
            <Component
                :is="passwordResetFormComponents.formComponent"
                @redirect-to="onRedirectTo" />
        </template>
        <FadeTransition>
            <Infographic
                :bg-url="passwordResetFormComponents.bgUrl"
                :bg-position="passwordResetFormComponents.bgPosition" />
        </FadeTransition>
    </Login>
</template>

<script>
import NewPasswordForm from '@Authentication/components/Forms/NewPasswordForm';
import Login from '@Authentication/components/Layout/Login';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import Infographic from '@Core/components/Infographic/Infographic';
import {
    ROUTE_NAME,
} from '@Core/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import FadeTransition from '@UI/components/Transitions/FadeTransition';

export default {
    name: 'PasswordReset',
    components: {
        NewPasswordForm,
        Login,
        Infographic,
        FadeTransition,
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
                            message: app.i18n.t('authentication.forms.newPassword.alertError'),
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
