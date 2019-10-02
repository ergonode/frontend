/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['content-base-footer', {'content-base-footer--space-between': spaceBetween}]">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ContentBaseFooter',
    props: {
        spaceBetween: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .content-base-footer {
        display: flex;
        flex-shrink: 0;
        justify-content: flex-end;
        align-items: center;
        padding: 8px 12px;
        background-color: $white;
        box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.12);

        &--space-between {
            justify-content: space-between;
        }
    }
</style>
