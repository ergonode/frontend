/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['drop-down', {'drop-down--fixed': fixedContent}]">
        <slot name="body" />
        <slot name="footer" />
    </div>
</template>

<script>

export default {
    name: 'DropDown',
    props: {
        fixedContent: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    .drop-down {
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
