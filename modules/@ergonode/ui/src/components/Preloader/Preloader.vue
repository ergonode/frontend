/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="preloader">
        <IconLoader
            :width="48"
            :height="48" />
    </div>
</template>

<script>
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconLoader from '@UI/components/Icons/Feedback/IconLoader';

export default {
    name: 'Preloader',
    components: {
        IconLoader,
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .preloader {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 24px;
    }
</style>
