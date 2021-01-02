/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="designer-body">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'DesignerBody',
};
</script>

<style lang="scss" scoped>
    .designer-body {
        position: relative;
        display: flex;
        flex: 1;
    }
</style>
