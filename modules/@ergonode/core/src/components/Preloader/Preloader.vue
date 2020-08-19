/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-preloader">
        <IconLoader
            :width="48"
            :height="48" />
    </div>
</template>

<script>
import {
    GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconLoader from '@Core/components/Icons/Feedback/IconLoader';

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
    .grid-preloader {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 24px;
    }
</style>
