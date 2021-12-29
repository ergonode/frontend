/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="vertical-centered-view">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'VerticalCenteredView',
};
</script>

<style lang="scss" scoped>
    .vertical-centered-view {
        position: relative;
        display: grid;
        flex: 1;
        justify-content: center;
        align-items: baseline;
        grid-auto-flow: column;
        grid-template-columns: max-content;
        column-gap: 24px;
        margin: 24px;

        &::after {
            content: "";
        }
    }
</style>
