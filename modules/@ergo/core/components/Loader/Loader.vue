
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="loader"
        :style="loaderStyles">
        <div class="spinner" />
    </div>
</template>
<script>
import {
    GREEN,
} from '@Core/assets/scss/_variables/_colors.scss';

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
