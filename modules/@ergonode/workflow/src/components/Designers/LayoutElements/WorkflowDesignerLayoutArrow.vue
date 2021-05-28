/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        :class="classes">
        <slot
            v-if="!isEdited"
            name="arrowActions" />
    </div>
</template>
<script>
import {
    COLUMN_WIDTH,
    LAYOUT_POINTER_WIDTH,
} from '@Workflow/defaults/designer';

export default {
    name: 'WorkflowDesignerLayoutArrow',
    props: {
        elementWidth: {
            type: Number,
            required: true,
        },
        mouseXPosition: {
            type: Number,
            default: 0,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
        isRevers: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        styles() {
            const offset = LAYOUT_POINTER_WIDTH + 4;

            if (this.isEdited) {
                const arrowStartPosition = `calc(50% + ${offset / 2}px)`;

                return {
                    width: `${Math.abs(this.mouseXPosition) - (offset / 2)}px`,
                    left: this.isRevers ? 'unset' : arrowStartPosition,
                    right: this.isRevers ? arrowStartPosition : 'unset',
                };
            }

            return {
                width: `${(this.elementWidth * COLUMN_WIDTH) - COLUMN_WIDTH - offset}px`,
            };
        },
        classes() {
            return [
                'workflow-designer-layout-arrow',
                {
                    'workflow-designer-layout-arrow--revers': this.isRevers,
                    'workflow-designer-layout-arrow--dashed': this.isEdited,
                },
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-layout-arrow {
        position: absolute;
        z-index: $Z_INDEX_LVL_3;
        justify-self: center;
        align-items: center;
        height: 0;
        border-top: 2px solid $GREEN;
        box-sizing: border-box;

        &::after {
            position: absolute;
            top: calc(50% - 12px / 2);
            left: -2px;
            width: 10px;
            height: 10px;
            border: 2px solid $GREEN;
            border-radius: 50%;
            box-sizing: border-box;
            background: $WHITE;
            content: "";
        }

        &::before {
            position: absolute;
            top: calc(50% - 12px / 2);
            right: -2px;
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-left: 8px solid $GREEN;
            content: "";
        }

        &--dashed {
            border-style: dashed;
        }

        &--revers {
            &::after {
                left: initial;
                right: -2px;
            }

            &::before {
                left: -2px;
                right: initial;
                border-left: none;
                border-right: 8px solid $GREEN;
            }
        }
    }
</style>
