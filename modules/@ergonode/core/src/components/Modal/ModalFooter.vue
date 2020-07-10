/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="modal-footer">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ModalFooter',
};
</script>

<style lang="scss" scoped>
    .modal-footer {
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        flex: 0;
        justify-content: space-between;
        padding: 16px 24px;
    }
</style>
