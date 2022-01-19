/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :style="columnStyles"
        class="designer-virtual-overlay__column"
        @dragover="onDragOver"
        @drop="onDrop">
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
</template>
<script>
import {
    getDraggedColumnPositionState,
} from '@UI/models/dragAndDrop/helpers';
import WorkflowDesignerVirtualOverlayRow
    from '@Workflow/components/Designers/VirtualOverlay/WorkflowDesignerVirtualOverlayRow';
import {
    COLUMN_WIDTH,
} from '@Workflow/defaults/designer';
import {
    mapActions,
    mapState,
} from 'vuex';

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
        ...mapState('draggable', [
            'ghostIndex',
            'draggedElIndex',
        ]),
        columnStyles() {
            return {
                width: `${COLUMN_WIDTH}px`,
                gridTemplateColumns: '1fr',
                gridTemplateRows: `repeat(${this.maxRowNumber + 1}, 1fr)`,
            };
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onDrop(event) {
            event.preventDefault();
            console.log('drop column');
        },
        onDragOver(event) {
            if (this.draggedElIndex === -1) {
                return false;
            }
            event.preventDefault();

            const {
                pageX,
            } = event;
            const {
                x: columnXPos, width: columnWidth,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedColumnPositionState(
                pageX,
                columnXPos,
                columnWidth,
            );

            if (this.columnIndex === this.ghostIndex
                    || (isBefore && this.ghostIndex === this.columnIndex - 1)
                    || (!isBefore && this.ghostIndex === this.columnIndex + 1)) {
                return false;
            }

            this.$emit('swap', {
                from: this.ghostIndex,
                to: this.columnIndex,
            });
            this.__setState({
                key: 'ghostIndex',
                value: this.columnIndex,
            });

            return true;
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
