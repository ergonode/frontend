/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login">
        <section class="login__body">
            <FluidBlob />
            <Component
                :is="loginFormComponents.loginFormComponent"
                @backTo="onBackTo" />
            <img
                class="login__infographic"
                :src="loginFormComponents.formImage">
        </section>
        <Footer space-between>
            <LinkButton
                title="Help"
                @click.native="onHelpClicked" />
            <IconLogoName class="login__footer-logo" />
        </Footer>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LOGIN_STATE } from '@Authentication/defaults/login-state';
import Footer from '@Core/components/Layout/Footer/Footer';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import FluidBlob from '@Core/components/Blob/FluidBlob';
import LinkButton from '@Core/components/Buttons/LinkButton';

export default {
    name: 'Login',
    components: {
        LinkButton,
        Footer,
        IconLogoName,
        FluidBlob,
    },
    data() {
        return {
            loginState: LOGIN_STATE.CREDENTIALS,
        };
    },
    computed: {
        ...mapState('authentication', {
            isLogged: state => state.isLogged,
        }),
        loginFormComponents() {
            switch (this.loginState) {
            case LOGIN_STATE.CREDENTIALS:
                return {
                    loginFormComponent: () => import('@Authentication/components/Form/LoginCredentialsForm'),
                    formImage: require('@Core/assets/images/login/login_face.png'),
                };
            case LOGIN_STATE.HELP:
                return {
                    loginFormComponent: () => import('@Authentication/components/Form/LoginHelpForm'),
                    formImage: require('@Core/assets/images/login/login_help_face.png'),
                };
            case LOGIN_STATE.PASSWORD_RECOVERY:
                return {
                    loginFormComponent: null,
                    formImage: require('@Core/assets/images/login/login_password_recovery_face.png'),
                };
            case LOGIN_STATE.NEW_PASSWORD:
                return {
                    loginFormComponent: null,
                    formImage: require('@Core/assets/images/login/login_new_password_face.png'),
                };
            default: return null;
            }
        },
    },
    created() {
        if (!this.isLogged) {
            this.resetState();
        }
    },
    methods: {
        ...mapActions([
            'resetState',
        ]),
        onHelpClicked() {
            this.loginState = LOGIN_STATE.HELP;
        },
        onBackTo(state) {
            this.loginState = state;
        },
    },
    layout: 'login',
};
</script>

<style lang="scss" scoped>
    .login {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;

        &__body {
            position: relative;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }

        &__infographic {
            z-index: $Z_INDEX_LVL_1;
            width: 460px;
            height: 360px;
            margin-left: 64px;
        }

        &__footer-logo {
            width: 85.5px;
            height: 24px;
        }
    }
</style>
