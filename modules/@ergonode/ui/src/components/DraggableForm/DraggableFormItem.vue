/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :index="index"
        :draggable="true"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <IconButton
            class="draggable-form-item__drag-button"
            ref="dragButton"
            :size="smallSize"
            :theme="secondaryPlainTheme">
            <template #icon>
                <IconDragDrop />
            </template>
        </IconButton>
        <div
            v-show="!isGhostVisible"
            class="draggable-form-item__body">
            <slot name="item" />
        </div>
        <DraggableFormGhostItem v-show="isGhostVisible" />
        <IconButton
            class="draggable-form-item__remove-button"
            :size="smallSize"
            :theme="secondaryPlainTheme"
            @click.native="onRemove">
            <template #icon>
                <IconFilledClose />
            </template>
        </IconButton>
    </div>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';
import {
    deepClone,
} from '@Core/models/objectWrapper';
import DraggableFormGhostItem from '@UI/components/DraggableForm/DraggableFormGhostItem';
import {
    getDraggedRowPositionState,
} from '@UI/models/dragAndDrop/helpers';
import {
    isMouseOutsideElement,
} from '@UI/models/mouse';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'DraggableFormItem',
    components: {
        DraggableFormGhostItem,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
        index: {
            type: Number,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState('draggable', [
            'draggedElement',
            'ghostIndex',
            'isOverDropZone',
        ]),
        classes() {
            return [
                'draggable-form-item',
                {
                    'draggable-form-item--disabled': this.draggedElement !== null,
                },
            ];
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
        isGhostVisible() {
            return this.ghostIndex === this.index;
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onRemove() {
            this.$emit('remove-item', this.item);
        },
        onDragStart(event) {
            if (isMouseOutsideElement(this.$refs.dragButton.$el, event.x, event.y)) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }

            addElementCopyToDocumentBody({
                event,
                id: this.item.id,
                label: this.item.label,
            });

            this.__setState({
                key: 'draggedElement',
                value: deepClone(this.item),
            });
            this.__setState({
                key: 'draggedInScope',
                value: this.scope,
            });
            this.__setState({
                key: 'ghostIndex',
                value: this.index,
            });
            this.__setState({
                key: 'isElementDragging',
                value: DRAGGED_ELEMENT.FORM_FIELD,
            });
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            if (this.isOverDropZone) {
                this.__setState({
                    key: 'isOverDropZone',
                    value: false,
                });

                this.$emit('remove-item', this.item);
            } else {
                this.$emit('drag-end', this.index);
            }

            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedInScope',
                value: '',
            });
            this.__setState({
                key: 'ghostIndex',
                value: -1,
            });
            this.__setState({
                key: 'isElementDragging',
                value: null,
            });
        },
        onDragOver(event) {
            event.preventDefault();

            const {
                pageY,
            } = event;
            const {
                y: itemYPos, height: itemHeight,
            } = this.$el.getBoundingClientRect();
            const isBefore = getDraggedRowPositionState(
                pageY,
                itemYPos,
                itemHeight,
            );

            if (this.index === this.ghostIndex
                || this.ghostIndex === -1
                || (isBefore && this.ghostIndex === this.index - 1)
                || (!isBefore && this.ghostIndex === this.index + 1)) {
                return;
            }

            this.$emit('swap', {
                from: this.ghostIndex,
                to: this.index,
            });

            this.__setState({
                key: 'ghostIndex',
                value: this.index,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-form-item {
        $item: &;

        position: relative;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: max-content 1fr max-content;
        align-items: flex-start;
        grid-column-gap: 8px;

        &__drag-button {
            cursor: grab;
        }

        &__drag-button, &__remove-button {
            opacity: 0;
        }

        &:hover:not(&--disabled) {
            #{$item}__drag-button, #{$item}__remove-button {
                opacity: 1;
            }
        }
    }
</style>
