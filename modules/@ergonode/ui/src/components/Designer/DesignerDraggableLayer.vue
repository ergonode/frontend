/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-draggable-layer">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'DesignerDraggableLayer',
};
</script>

<style lang="scss" scoped>
    .designer-draggable-layer {
        position: relative;
        display: grid;
        flex: 1;
    }
</style>
