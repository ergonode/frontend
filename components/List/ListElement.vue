/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="elementClasses">
        <slot v-if="!dragged" />
    </div>
</template>

<script>
export default {
    name: 'ListElement',
    props: {
        dragged: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        regular: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        elementClasses() {
            return [
                'element',
                {
                    'element--dragged': this.dragged,
                    'element--disabled': this.disabled,
                    'element--regular': this.regular,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .element {
        position: relative;
        display: flex;
        padding: 8px 12px;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        user-select: none;

        &--dragged {
            z-index: 11;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }

        &--disabled {
            position: relative;
            pointer-events: none;

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.7);
                content: "";
            }
        }

        &:not(&--dragged):not(&--disabled):hover {
            background-color: $background;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
            opacity: 1;
        }

        &--regular {
            height: 24px;
        }
    }
</style>
