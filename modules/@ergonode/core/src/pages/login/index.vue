/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login">
        <section class="login__body">
            <span
                v-if="showReleaseInfo"
                class="release-info"
                v-text="showReleaseInfo" />
            <FluidBlob />
            <Component
                :is="loginFormComponents.loginFormComponent"
                @back-to="onBackTo" />
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
import {
    JWT_KEY,
} from '@Authentication/defaults/cookies';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import FluidBlob from '@Core/components/Blob/FluidBlob';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import Footer from '@Core/components/Layout/Footer/Footer';
import LinkButton from '@Core/components/LinkButton/LinkButton';
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
import {
    format as formatDate,
} from 'date-fns';
import {
    mapActions,
    mapState,
} from 'vuex';

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
        ...mapState('authentication', [
            'isLogged',
        ]),
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
        showReleaseInfo() {
            const releaseVersion = process.env.VUE_APP_VERSION;
            const gitInfo = process.env.VUE_APP_GIT_INFO;

            if (!process.env.SHOW_RELEASE_INFO) return null;

            return `Commit hash: ${gitInfo.abbreviatedSha}
            Date: ${formatDate(new Date(gitInfo.committerDate), DEFAULT_DATA_HOUR_FORMAT)}
            Release: v${releaseVersion}`;
        },
    },
    created() {
        if (!this.isLogged) {
            this.$cookies.remove(JWT_KEY);
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
        background-color: $WHITESMOKE;

        &__body {
            position: relative;
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;

            .release-info {
                position: absolute;
                top: 0;
                right: 0;
                padding: 10px;
                white-space: pre-wrap;
                color: $GREY_DARK;
                font: $FONT_MEDIUM_12_16;
                text-align: right;
            }
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
