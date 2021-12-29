/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="modal-body">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ModalBody',
};
</script>

<style lang="scss" scoped>
    .modal-body {
        flex: 1;
        padding: 24px;
        overflow: auto;
    }
</style>
