
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="loader-wrapper"
        :style="loaderStyles">
        <div class="loader" />
    </div>
</template>
<script>
import {
    GREEN,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'Loader',
    props: {
        color: {
            type: String,
            default: GREEN,
        },
        size: {
            type: String,
            default: '20px',
        },
    },
    computed: {
        loaderStyles() {
            return {
                fontSize: this.size,
                color: this.color,
            };
        },
    },
};
</script>
<style lang="scss" scoped>
    @import "~assets/scss/loader.scss";
</style>
