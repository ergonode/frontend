/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-ghost-button">
        <CreateWorkflowTransitionFab />
    </div>
</template>
<script>
import {
    ROW_HEIGHT,
} from '@UI/defaults/designer';
import CreateWorkflowTransitionFab
    from '@Workflow/components/Buttons/CreateWorkflowTransitionFab';

export default {
    name: 'WorkflowDesignerGhostButton',
    components: {
        CreateWorkflowTransitionFab,
    },
    props: {
        row: {
            type: Number,
            default: 0,
        },
        column: {
            type: Number,
            default: 0,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
    },
    computed: {
        styles() {
            const size = 1;
            const gridRow = this.row + 1;
            const gridColumn = this.column + 1;

            return {
                gridArea: `${gridRow} / ${gridColumn} / ${gridRow + size} / ${gridColumn + size}`,
                height: `${this.rowHeight}px`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-ghost-button {
        z-index: $Z_INDEX_LVL_1;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>
