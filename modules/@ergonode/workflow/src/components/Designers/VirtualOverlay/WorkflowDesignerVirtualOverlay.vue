/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="styles"
        class="designer-virtual-overlay">
        <WorkflowDesignerVirtualOverlayColumn
            v-for="(columnEl, columnIndex) in columns"
            :key="`column_${columnIndex}`"
            :scope="scope"
            :column-index="columnIndex"
            :column-data="columnEl"
            :rows="rows"
            :max-row-number="maxRowNumber"
            @swap="onSwapColumns">
            <template #appendRowBody="{ column }">
                <slot
                    name="appendRowBody"
                    :column="column" />
            </template>
        </WorkflowDesignerVirtualOverlayColumn>
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
        scope: {
            type: String,
            default: '',
        },
        rows: {
            type: Array,
            required: true,
        },
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
        columns: {
            type: Array,
            required: true,
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
    methods: {
        onSwapColumns(payload) {
            this.$emit('swap', payload);
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
