/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login">
        <section class="login__body">
            <GitReleaseInformation v-if="isReleaseInformation" />
            <FluidBlob />
            <div class="login-body__form">
                <slot name="form" />
            </div>
            <slot />
        </section>
        <Footer space-between>
            <div class="login__footer-info">
                <Select
                    data-cy="change-language"
                    :value="value"
                    :options="languageOptions"
                    :size="smallSize"
                    @input="onValueChange" />
                <LinkButton
                    data-cy="help-button"
                    :title="$t('@Authentication.authentication.components.LoginLayout.help')"
                    @click.native="onHelpClicked" />
                <LinkButton
                    data-cy="guide-button"
                    :title="$t('@Authentication.authentication.components.LoginLayout.userGuide')"
                    @click.native="onUserGuideOpen" />
                <template
                    v-for="(footerInfo, index) in extendedFooterInfo">
                    <Component
                        :is="footerInfo.component"
                        :key="index"
                        v-bind="footerInfo.props" />
                </template>
            </div>
            <IconLogoName
                class="login__footer-logo"
                width="85.5"
                height="24"
                @click.native="onWebsiteOpen" />
        </Footer>
    </main>
</template>

<script>
import {
    USER_INTERFACE_LANGUAGE_KEY,
} from '@Authentication/defaults/cookies';
import {
    TRANSLATIONS,
} from '@Authentication/defaults/layout';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import Footer from '@UI/components/Layout/Footer/Footer';

export default {
    name: 'Login',
    components: {
        Footer,
        IconLogoName,
        GitReleaseInformation: () => import('@Core/components/GitReleaseInformation/GitReleaseInformation'),
    },
    data() {
        return {
            value: TRANSLATIONS[this.$cookies.get(USER_INTERFACE_LANGUAGE_KEY)],
        };
    },
    computed: {
        extendedFooterInfo() {
            return this.$getExtendSlot('@Authentication/components/Layout/Login/footerInfo');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        languageOptions() {
            return Object.values(TRANSLATIONS);
        },
        isReleaseInformation() {
            return this.$config.SHOW_RELEASE_INFO;
        },
    },
    methods: {
        onHelpClicked() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
        },
        onUserGuideOpen() {
            window.open('https://userguide.ergonode.com', '_blank');
        },
        onWebsiteOpen() {
            window.open('https://ergonode.com', '_blank');
        },
        onValueChange(value) {
            const languageKey = getKeyByValue(TRANSLATIONS, value);

            this.value = value;
            this.$cookies.set(USER_INTERFACE_LANGUAGE_KEY, languageKey);
            this.$setInterfaceLanguage(languageKey);
        },
    },
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
            display: grid;
            flex: 1;
            justify-content: center;
            grid-auto-flow: column;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 16px;

            .login-body__form {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
        }

        &__footer-logo {
            cursor: pointer;
        }

        &__footer-info {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            grid-template-columns: 128px max-content max-content;
            column-gap: 16px;
        }
    }
</style>
