/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'GridBody',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return [
                'grid-body',
                {
                    'grid-body--disabled': this.disabled,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-body {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        border: $BORDER_1_GREY;
        background-color: $WHITESMOKE;

        &::after {
            position: absolute;
            z-index: $Z_INDEX_NEGATIVE;
            width: 100%;
            height: 100%;
            content: "";
        }

        &--disabled {
            &::after {
                z-index: $Z_INDEX_LVL_4;
            }
        }
    }
</style>
