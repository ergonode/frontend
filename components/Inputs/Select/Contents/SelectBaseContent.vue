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
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;

        &--fixed {
            max-height: 200px;
        }
    }
</style>
