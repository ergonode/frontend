/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-preloader">
        <span class="grid-preloader__title">Loading...</span>
        <IconSpinner
            :color="graphiteColor"
            width="16"
            height="16" />
    </div>
</template>

<script>
import {
    GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';

export default {
    name: 'GridPreloader',
    components: {
        IconSpinner,
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-preloader {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: 24px;

        &__title {
            margin-right: 8px;
            color: $GRAPHITE;
            font: $FONT_SEMI_BOLD_14_20;
        }
    }
</style>
