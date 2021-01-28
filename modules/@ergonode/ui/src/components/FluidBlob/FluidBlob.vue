/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="fluid-blob" />
</template>

<script>
export default {
    name: 'FluidBlob',
};
</script>

<style lang="scss" scoped>
    .fluid-blob {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: $Z_INDEX_LVL_0;
        width: 600px;
        height: 600px;
        transform: translate(-50%, -50%);
        background: $WHITE;
        will-change: border-radius;
        animation: fluid 20s infinite;
    }

    @keyframes fluid {
        0%, 100% {
            border-radius: 64% 36% 27% 73% / 55% 58% 42% 45%;
        }

        25% {
            border-radius: 73% 27% 26% 38% / 73% 36% 64% 27%;
        }

        50% {
            border-radius: 28% 72% 44% 56% / 49% 40% 60% 51%;
        }

        75% {
            border-radius: 40% 60% 70% 30% / 47% 62% 38% 53%;
        }
    }
</style>
