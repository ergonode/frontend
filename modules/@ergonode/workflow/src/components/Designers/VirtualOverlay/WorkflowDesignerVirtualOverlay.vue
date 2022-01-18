/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-virtual-overlay">
        <WorkflowDesignerVirtualOverlayColumn
            v-for="(column) in columns"
            :key="`column_${column}`"
            :column-index="column"
            :rows="rows"
            :max-row-number="maxRowNumber" />
    </div>
</template>
<script>
import {
    getMaxValueObject,
} from '@Core/models/arrayWrapper';
import WorkflowDesignerVirtualOverlayColumn
    from '@Workflow/components/Designers/VirtualOverlay/WorkflowDesignerVirtualOverlayColumn';
import {
    HEADER_HEIGHT,
    ROW_HEIGHT,
} from '@Workflow/defaults/designer';

export default {
    name: 'WorkflowDesignerVirtualOverlay',
    components: {
        WorkflowDesignerVirtualOverlayColumn,
    },
    props: {
        rows: {
            type: Array,
            required: true,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
        columns: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        maxRowNumber() {
            return getMaxValueObject(this.rows, 'row').row || 0;
        },
        styles() {
            return {
                top: `${HEADER_HEIGHT}px`,
                height: `${(this.maxRowNumber + 1) * this.rowHeight}px`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer-virtual-overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $Z_INDEX_LVL_4;
        display: flex;
        flex-direction: row;
        width: 100%;
    }
</style>
