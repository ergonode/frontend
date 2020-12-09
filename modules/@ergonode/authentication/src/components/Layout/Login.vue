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
    TRANSLATION_KEY,
} from '@Authentication/defaults/cookies';
import {
    DEFAULT_TRANSLATION,
    TRANSLATIONS,
} from '@Authentication/defaults/layout';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
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
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'Login',
    components: {
        LinkButton,
        Footer,
        IconLogoName,
        FluidBlob,
        Select,
    },
    data() {
        return {
            value: TRANSLATIONS[this.$cookies.get(TRANSLATION_KEY)]
                || TRANSLATIONS[DEFAULT_TRANSLATION],
        };
    },
    computed: {
        showReleaseInfo() {
            const releaseVersion = process.env.VUE_APP_VERSION;
            const gitInfo = process.env.VUE_APP_GIT_INFO;

            if (!process.env.SHOW_RELEASE_INFO) return null;

            return `Commit hash: ${gitInfo.abbreviatedSha}
            Date: ${formatDate(new Date(gitInfo.committerDate), DEFAULT_DATA_HOUR_FORMAT)}
            Release: v${releaseVersion}`;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        languageOptions() {
            return Object.values(TRANSLATIONS);
        },
    },
    mounted() {
        if (!this.$cookies.get(TRANSLATION_KEY)) {
            this.$cookies.set(TRANSLATION_KEY, DEFAULT_TRANSLATION);
        }

        this.$setInterfaceLanguage(getKeyByValue(TRANSLATIONS, this.value));
    },
    methods: {
        onHelpClicked() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
        },
        onValueChange(value) {
            const languageKey = getKeyByValue(TRANSLATIONS, value);

            this.value = value;
            this.$cookies.set(TRANSLATION_KEY, languageKey);
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
