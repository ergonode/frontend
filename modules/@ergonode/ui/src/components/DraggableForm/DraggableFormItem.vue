/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="draggable-form-item"
        :draggable="true"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot name="item" />
    </div>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    getDraggedColumnPositionState,
} from '@UI/models/dragAndDrop/helpers';

export default {
    name: 'DraggableFormItem',
    methods: {
        onDragStart(event) {
            addElementCopyToDocumentBody({
                event,
                id: this.filterId,
                label: this.title,
            });
            this.__setState({
                key: 'draggedElement',
                value: this.filterId,
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.FILTER,
            });

            requestAnimationFrame(() => {
                this.__setState({
                    key: 'ghostIndex',
                    value: this.index,
                });
            });
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            if (this.isOverDropZone) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove', this.index);
            }

            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'ghostIndex',
                value: -1,
            });
        },
        onDragOver(event) {
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

            if (this.index === this.ghostIndex
                || (isBefore && this.ghostIndex === this.index - 1)
                || (!isBefore && this.ghostIndex === this.index + 1)
                || this.isElementDragging === DRAGGED_ELEMENT.COLUMN) {
                return false;
            }

            this.$emit('swap', {
                from: this.ghostIndex,
                to: this.index,
            });
            this.__setState({
                key: 'ghostIndex',
                value: this.index,
            });
            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form-item {

    }
</style>
