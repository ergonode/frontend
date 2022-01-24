/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <WorkflowDesignerDraggableColumnLayer
        :scope="scope"
        :index="columnIndex"
        :column="columnData"
        @swap="onSwapColumns">
        <div
            :style="columnStyles"
            class="designer-virtual-overlay__column">
            <template v-for="(row, rowIndex) in rows">
                <WorkflowDesignerVirtualOverlayRow
                    v-if="row.from === columnIndex || row.to === columnIndex"
                    :key="`row_${rowIndex}`"
                    :row="row"
                    :column-index="columnIndex">
                    <template #appendRowBody="{ column }">
                        <slot
                            name="appendRowBody"
                            :column="column" />
                    </template>
                </WorkflowDesignerVirtualOverlayRow>
            </template>
        </div>
    </WorkflowDesignerDraggableColumnLayer>
</template>
<script>
import WorkflowDesignerVirtualOverlayRow
    from '@Workflow/components/Designers/VirtualOverlay/WorkflowDesignerVirtualOverlayRow';
import WorkflowDesignerDraggableColumnLayer
    from '@Workflow/components/Designers/WorkflowDesignerDraggableColumnLayer';
import {
    COLUMN_WIDTH,
} from '@Workflow/defaults/designer';

export default {
    name: 'WorkflowDesignerVirtualOverlayColumn',
    components: {
        WorkflowDesignerVirtualOverlayRow,
        WorkflowDesignerDraggableColumnLayer,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
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
        columnData: {
            type: Object,
            required: true,
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
    methods: {
        onSwapColumns(payload) {
            this.$emit('swap', payload);
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
