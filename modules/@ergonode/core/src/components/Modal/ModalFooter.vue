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
        display: flex;
        flex: 0;
        justify-content: space-between;
        padding: 0 24px 24px;
    }
</style>
