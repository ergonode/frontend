/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Login
        @redirect-to="onRedirectTo">
        <template
            v-if="loginFormComponents"
            #form>
            <Component
                :is="loginFormComponents.formComponent"
                @redirect-to="onRedirectTo" />
        </template>
        <Infographic
            v-if="loginFormComponents"
            :bg-url="loginFormComponents.bgUrl"
            :bg-position="loginFormComponents.bgPosition" />
    </Login>
</template>

<script>
import LoginCredentialsForm from '@Authentication/components/Forms/LoginCredentialsForm';
import LoginHelpForm from '@Authentication/components/Forms/LoginHelpForm';
import PasswordRecoveryCheckEmail from '@Authentication/components/Forms/PasswordRecoveryCheckEmail';
import PasswordRecoveryForm from '@Authentication/components/Forms/PasswordRecoveryForm';
import Infographic from '@Authentication/components/Infographic/Infographic';
import Login from '@Authentication/components/Layout/Login';
import {
    REFRESH_TOKEN_KEY,
    TOKEN_KEY,
} from '@Authentication/defaults/cookies';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import {
    isEmpty,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'LoginPage',
    components: {
        Login,
        Infographic,
    },
    data() {
        return {
            activeLoginState: LOGIN_STATE.CREDENTIALS,
            extendedLoginStates: {},
        };
    },
    computed: {
        ...mapState('authentication', [
            'isLogged',
        ]),
        loginFormComponents() {
            if (!LOGIN_STATE[this.activeLoginState] && !isEmpty(this.extendedLoginStates)) {
                return this.extendedLoginStates[this.activeLoginState];
            }

            switch (this.activeLoginState) {
            case LOGIN_STATE.CREDENTIALS:
                return {
                    formComponent: LoginCredentialsForm,
                    bgUrl: require('@Authentication/assets/images/infographics/walking-woman.svg'),
                };
            case LOGIN_STATE.HELP:
                return {
                    formComponent: LoginHelpForm,
                    bgUrl: require('@Authentication/assets/images/infographics/calling-man.svg'),
                    bgPosition: {
                        vertical: 'calc(50% - 60px)',
                        horizontal: '-60px',
                    },
                };
            case LOGIN_STATE.PASSWORD_RECOVERY:
                return {
                    formComponent: PasswordRecoveryForm,
                    bgUrl: require('@Authentication/assets/images/infographics/man-with-plane.svg'),
                    bgPosition: {
                        vertical: 'calc(50% - 60px)',
                        horizontal: '-60px',
                    },
                };
            case LOGIN_STATE.CHECK_EMAIL:
                return {
                    formComponent: PasswordRecoveryCheckEmail,
                    bgUrl: require('@Authentication/assets/images/infographics/man-with-flying-plane.svg'),
                    bgPosition: {
                        vertical: 'calc(50% - 60px)',
                        horizontal: '-60px',
                    },
                };
            default: return null;
            }
        },
    },
    async mounted() {
        const extendedLoginStates = await this.$getExtendMethod('@Authentication/pages/login/loginState');

        extendedLoginStates.forEach((states) => {
            this.extendedLoginStates = {
                ...this.extendedLoginStates,
                ...states,
            };
        });
    },
    created() {
        const {
            loginState = null,
            alert = null,
        } = this.$route.params;

        if (!this.isLogged) {
            this.$cookies.remove(TOKEN_KEY);
            this.$cookies.remove(REFRESH_TOKEN_KEY);
            this.resetState();
        }

        if (loginState) {
            this.activeLoginState = loginState;
        }

        if (alert) {
            this.$addAlert(alert);
        }
    },
    methods: {
        ...mapActions([
            'resetState',
        ]),
        onRedirectTo(state) {
            this.activeLoginState = state;
        },
    },
    layout: 'login',
};
</script>
