/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <img
        class="infographic"
        :src="src">
</template>
<script>
export default {
    name: 'Infographic',
    props: {
        src: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss" scoped>
    .infographic {
        z-index: $Z_INDEX_LVL_1;
        width: 460px;
        height: 360px;
        margin-left: 64px;
    }
</style>
