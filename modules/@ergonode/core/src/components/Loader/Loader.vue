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
} from '@Core/assets/scss/_js-variables/colors.scss';

export default {
    name: 'Loader',
    props: {
        /**
         * Color of loader
         */
        color: {
            type: String,
            default: GREEN,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        /**
         * The size of the component
         */
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
    @import "@Core/assets/scss/loader/loader.scss";
</style>
