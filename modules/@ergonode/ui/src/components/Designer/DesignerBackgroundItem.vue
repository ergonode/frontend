/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-background-item">
        <slot />
    </div>
</template>
<script>

export default {
    name: 'DesignerBackgroundItem',
};
</script>

<style lang="scss" scoped>
    .designer-background-item {
        border-top: $BORDER_DASHED_GREY;
        border-left: $BORDER_DASHED_GREY;
    }
</style>
