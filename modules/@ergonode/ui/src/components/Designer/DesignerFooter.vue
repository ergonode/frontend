/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-footer">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'DesignerFooter',
};
</script>

<style lang="scss" scoped>
    .designer-footer {
        display: flex;
        flex: 0 0 64px;
        justify-content: center;
        align-items: center;
        border: $BORDER_DASHED_GREY;
        box-sizing: border-box;
    }
</style>
