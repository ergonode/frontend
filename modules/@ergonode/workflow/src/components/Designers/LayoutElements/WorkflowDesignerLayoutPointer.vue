/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-layout-pointer">
        <div
            class="workflow-designer-layout-pointer-badge"
            :style="badgeStyles" />
    </div>
</template>
<script>

import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    LAYOUT_POINTER_WIDTH,
} from '@Workflow/defaults/designer';

export default {
    name: 'WorkflowDesignerLayoutPointer',
    props: {
        color: {
            type: String,
            default: WHITESMOKE,
            validator: value => /^#([A-Fa-f0-9]{6})$/.test(value),
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        badgeStyles() {
            return {
                '--backgroundColor': this.color,
                width: `${LAYOUT_POINTER_WIDTH}px`,
                height: `${LAYOUT_POINTER_WIDTH}px`,
                cursor: this.isEdited ? 'pointer' : 'default',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-layout-pointer {
        z-index: $Z_INDEX_LVL_2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        box-sizing: border-box;
        grid-column: 1;

        &-badge {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid $GREY;
            box-sizing: border-box;
            background: $WHITESMOKE;
            border-radius: 50%;

            &::before {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                box-sizing: border-box;
                background-color: var(--backgroundColor);
                content: "";
            }
        }
    }
</style>
