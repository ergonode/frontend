/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login">
        <section class="login__body">
            <GitInformation />
            <FluidBlob />
            <slot />
        </section>
        <Footer space-between>
            <div class="login__footer-info">
                <Select
                    class="footer-info__select"
                    :value="value"
                    :options="languageOptions"
                    :size="smallSize"
                    @input="onValueChange" />
                <LinkButton
                    :title="$t('authentication.layout.help')"
                    @click.native="onHelpClicked" />
            </div>
            <IconLogoName class="login__footer-logo" />
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
import GitInformation from '@Core/components/ReleaseInfo/GitInformation';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import FluidBlob from '@UI/components/FluidBlob/FluidBlob';
import Footer from '@UI/components/Layout/Footer/Footer';
import LinkButton from '@UI/components/LinkButton/LinkButton';
import Select from '@UI/components/Select/Select';

export default {
    name: 'Login',
    components: {
        LinkButton,
        Footer,
        GitInformation,
        IconLogoName,
        FluidBlob,
        Select,
    },
    data() {
        return {
            value: TRANSLATIONS[this.$cookies.get(USER_INTERFACE_LANGUAGE_KEY)],
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        languageOptions() {
            return Object.values(TRANSLATIONS);
        },
    },
    methods: {
        onHelpClicked() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
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
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
        }

        &__footer-logo {
            width: 85.5px;
            height: 24px;
        }

        &__footer-info {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            column-gap: 16px;

            .footer-info__select {
                width: 128px;
            }
        }
    }
</style>
