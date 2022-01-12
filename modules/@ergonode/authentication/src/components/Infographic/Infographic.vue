/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="infographic"
        :style="placeholderStyles" />
</template>
<script>
export default {
    name: 'Infographic',
    props: {
        bgUrl: {
            type: String,
            default: '',
        },
        bgPosition: {
            type: Object,
            default: () => ({
                vertical: 'center',
                horizontal: 'left',
            }),
        },
    },
    computed: {
        placeholderStyles() {
            return {
                background: `url(${this.bgUrl}) no-repeat ${this.bgPosition.horizontal} ${this.bgPosition.vertical}`,
            };
        },
    },
};
</script>
<style lang="scss" scoped>
    .infographic {
        z-index: $Z_INDEX_LVL_1;
        animation: fade-in 1s;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
    }
</style>
