/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
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
        <IconDragDrop
            ref="dragIcon"
            class="draggable-form-item__drag-icon" />
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
import IconButton from '@UI/components/IconButton/IconButton';
import IconDragDrop from '@UI/components/Icons/Actions/IconDragDrop';
import IconFilledClose from '@UI/components/Icons/Window/IconFilledClose';
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
        IconFilledClose,
        IconDragDrop,
        IconButton,
    },
    props: {
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
            'draggedElIndex',
            'isOverDropZone',
        ]),
        classes() {
            return [
                'draggable-form-item',
                {
                    'draggable-form-item--disabled': this.draggedElement !== null,
                    'draggable-form-item--hidden': this.draggedElIndex === this.index && this.ghostIndex === -1,
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
            this.$emit('remove-item', this.index);
        },
        onDragStart(event) {
            if (isMouseOutsideElement(this.$refs.dragIcon.$el, event.x, event.y)) {
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
                key: 'draggedElIndex',
                value: this.index,
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

                this.$emit('remove-item', this.index);
            }

            this.__setState({
                key: 'draggedElement',
                value: null,
            });
            this.__setState({
                key: 'draggedElIndex',
                value: -1,
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

        &--hidden {
            display: none;
        }

        &__drag-icon {
            margin-top: 8px;
            cursor: grab;
        }

        &__remove-button {
            margin-top: 4px;
        }

        &__drag-icon, &__remove-button {
            opacity: 0;
        }

        &:hover:not(&--disabled) {
            #{$item}__drag-icon, #{$item}__remove-button {
                opacity: 1;
            }
        }
    }
</style>
