/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <span
        class="git-release-information"
        v-text="showReleaseInfo" />
</template>
<script>
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
import {
    format as formatDate,
} from 'date-fns';
import getRepoInfo from 'git-repo-info';

export default {
    name: 'GitReleaseInformation',
    async fetch() {
        this.repoInfo = await getRepoInfo();
    },
    data() {
        return {
            repoInfo: {
                abbreviatedSha: '',
                committerDate: '',
            },
        };
    },
    computed: {
        showReleaseInfo() {
            if (!(this.repoInfo.abbreviatedSha && this.repoInfo.committerDate)) {
                return '';
            }

            return `Commit hash: ${this.repoInfo.abbreviatedSha}
            Date: ${formatDate(new Date(this.repoInfo.committerDate), DEFAULT_DATA_HOUR_FORMAT)}
            Release: v${this.$config.VUE_APP_VERSION}`;
        },
    },
};
</script>
<style lang="scss" scoped>
    .git-release-information {
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
