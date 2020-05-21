/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['dropdown-footer', {
            'space-between': spaceBetween,
            'small': small,
        }]"
        @click.stop>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'DropDownFooter',
    props: {
        spaceBetween: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
    .dropdown-footer {
        display: flex;
        flex-shrink: 0;
        justify-content: flex-end;
        align-items: center;
        flex-basis: 48px;
        padding: 0 12px;
        box-sizing: border-box;
        background-color: $WHITE;
        box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.12);

        &.space-between {
            justify-content: space-between;
        }

        &.small {
            flex-basis: 40px;
            padding: 0 8px;
        }
    }
</style>
