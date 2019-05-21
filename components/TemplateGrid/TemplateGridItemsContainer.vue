/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-items-container"
        :style="gridStyles">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TemplateGridItemsContainer',
    props: {
        gridStyles: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-items-container {
        display: grid;
        height: auto;
    }
</style>
