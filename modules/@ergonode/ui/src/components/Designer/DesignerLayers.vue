/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-layers">
        <slot name="prependLayer" />
        <div class="designer-layers__background">
            <slot name="backgroundLayer" />
        </div>
        <slot name="draggableLayer" />
    </div>
</template>

<script>

export default {
    name: 'DesignerLayers',
};
</script>

<style lang="scss" scoped>
    .designer-layers {
        display: flex;
        flex-direction: column;

        &__background {
            position: relative;
        }
    }
</style>
