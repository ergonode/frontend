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
            <LinkButton
                title="Help"
                @click.native="onHelpClicked" />
            <IconLogoName class="login__footer-logo" />
        </Footer>
    </main>
</template>

<script>
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
import FluidBlob from '@UI/components/FluidBlob/FluidBlob';
import Footer from '@UI/components/Layout/Footer/Footer';
import LinkButton from '@UI/components/LinkButton/LinkButton';
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
    },
    methods: {
        onHelpClicked() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
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
    }
</style>
