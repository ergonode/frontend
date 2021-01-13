/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        v-if="showReleaseInfo"
        class="release-info"
        v-text="showReleaseInfo" />
</template>
<script>
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
import {
    format as formatDate,
} from 'date-fns';

export default {
    name: 'GitInformation',
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
};
</script>
<style lang="scss" scoped>
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
</style>
