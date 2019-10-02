/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['select-base-content', {'select-base-content--fixed': fixedContent}]">
        <slot name="body" />
        <slot name="footer" />
    </div>
</template>

<script>

export default {
    name: 'SelectBaseContent',
    props: {
        fixedContent: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .select-base-content {
        position: fixed;
        z-index: 999;
        display: flex;
        flex-direction: column;
        background-color: $white;
        box-shadow:
            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            0 3px 1px -2px rgba(0, 0, 0, 0.12),
            0 1px 5px 0 rgba(0, 0, 0, 0.2);

        &--fixed {
            max-height: 200px;
        }
    }
</style>
