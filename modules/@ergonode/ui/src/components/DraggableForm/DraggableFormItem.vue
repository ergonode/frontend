/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="classes"
        :draggable="true"
        @dragover="onDragOver"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <IconDragDrop
            ref="dragIcon"
            class="draggable-form-item__drag-icon" />
        <slot
            v-if="!isDragged"
            name="item" />
        <DraggableFormGhostItem v-else />
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
    data() {
        return {
            isDragged: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'draggedElement',
            'ghostIndex',
        ]),
        classes() {
            return [
                'draggable-form-item',
                {
                    'draggable-form-item--disabled': this.ghostIndex !== -1,
                },
            ];
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryPlainTheme() {
            return THEME.SECONDARY_PLAIN;
        },
    },
    methods: {
        ...mapActions('draggable', [
            '__setState',
        ]),
        onRemove() {
            this.$emit('remove', this.index);
        },
        onDragStart(event) {
            if (isMouseOutsideElement(this.$refs.dragIcon.$el, event.x, event.y)) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }

            this.isDragged = true;

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
                key: 'ghostIndex',
                value: this.index,
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

            this.isDragged = false;

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
        display: flex;
        align-items: center;

        &__drag-icon {
            top: 8px;
            left: -40px;
            cursor: grab;
        }

        &__remove-button {
            top: 4px;
            right: -40px;
        }

        &__drag-icon, &__remove-button {
            position: absolute;
            opacity: 0;
        }

        &:hover:not(&--disabled) {
            #{$item}__drag-icon, #{$item}__remove-button {
                opacity: 1;
            }
        }
    }
</style>
