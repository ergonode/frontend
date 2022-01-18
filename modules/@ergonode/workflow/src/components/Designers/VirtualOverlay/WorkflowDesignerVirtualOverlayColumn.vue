/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="columnStyles"
        class="designer-virtual-overlay__column">
        <template v-for="(row, rowIndex) in rows">
            <WorkflowDesignerVirtualOverlayRow
                v-if="row.from === columnIndex - 1 || row.to === columnIndex - 1"
                :key="`row_${rowIndex}`"
                :row="row"
                :column-index="columnIndex - 1">
                <template #appendRowBody="{ column }">
                    <slot
                        name="appendRowBody"
                        :column="column" />
                </template>
            </WorkflowDesignerVirtualOverlayRow>
        </template>
    </div>
</template>
<script>
import WorkflowDesignerVirtualOverlayRow
    from '@Workflow/components/Designers/VirtualOverlay/WorkflowDesignerVirtualOverlayRow';
import {
    COLUMN_WIDTH,
} from '@Workflow/defaults/designer';

export default {
    name: 'WorkflowDesignerVirtualOverlayColumn',
    components: {
        WorkflowDesignerVirtualOverlayRow,
    },
    props: {
        rows: {
            type: Array,
            required: true,
        },
        maxRowNumber: {
            type: Number,
            default: 0,
        },
        columnIndex: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        columnStyles() {
            return {
                width: `${COLUMN_WIDTH}px`,
                gridTemplateColumns: '1fr',
                gridTemplateRows: `repeat(${this.maxRowNumber + 1}, 1fr)`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-virtual-overlay__column {
        display: grid;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
