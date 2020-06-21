/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="elementClasses"
        :draggable="!isDragged && isDraggable"
        :title="hint"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot v-if="!isDragged" />
        <IconDragDrop class="draggable-element__icon" />
    </li>
</template>

<script>
import IconDragDrop from '@Core/components/Icons/Actions/IconDragDrop';
import {
    addElementCopyToDocumentBody,
    removeElementCopyFromDocumentBody,
} from '@Core/models/layout/ElementCopy';

export default {
    name: 'ListDraggableElement',
    components: {
        IconDragDrop,
    },
    props: {
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isDraggable: {
            type: Boolean,
            default: true,
        },
        draggableId: {
            type: String,
            default: '',
        },
        hint: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isDragged: false,
        };
    },
    computed: {
        elementClasses() {
            return [
                'draggable-element',
                {
                    'draggable-element--dragged': this.isDragged,
                    'draggable-element--disabled': this.isDisabled,
                },
            ];
        },
    },
    methods: {
        onDragStart(event) {
            addElementCopyToDocumentBody({
                event,
                element: this.$el,
                id: this.draggableId,
            });

            this.isDragged = true;
            this.$emit('drag', true);
        },
        onDragEnd(event) {
            removeElementCopyFromDocumentBody(event);

            this.isDragged = false;
            this.$emit('drag', false);
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-element {
        $element: &;

        position: relative;
        display: flex;
        align-items: center;
        height: 48px;
        padding: 0 16px 0 12px;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        user-select: none;
        cursor: grab;

        &__icon {
            opacity: 0;
        }

        &--dragged {
            z-index: 11;
            background-color: $GREY_LIGHT;
            box-shadow: $ELEVATOR_HOLE;
        }

        &--disabled {
            position: relative;
            pointer-events: none;
            cursor: not-allowed;

            &:before {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.7);
                content: "";
            }
        }

        &:not(&--dragged):not(&--disabled):hover {
            background-color: $WHITESMOKE;
            box-shadow: $ELEVATOR_2_DP;

            #{$element}__icon {
                opacity: 1;
            }
        }
    }
</style>
