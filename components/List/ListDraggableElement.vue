/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="elementClasses"
        :draggable="!isDragged && isDraggable"
        @dragstart="onDragStart"
        @dragend="onDragEnd">
        <slot v-if="!isDragged" />
    </div>
</template>

<script>
export default {
    name: 'ListDraggableElement',
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
            const width = 246;
            const clonedDOMElementStyle = `
                position: absolute;
                background-color: #fff;
                height: 48px;
                width: ${width}px;
            `;
            const clonedDOMElement = event.target.cloneNode(true);

            clonedDOMElement.setAttribute('style', clonedDOMElementStyle);
            clonedDOMElement.classList.add('cloned-list-element');
            document.body.appendChild(clonedDOMElement);
            event.dataTransfer.setDragImage(clonedDOMElement, width / 2, 0);
            event.dataTransfer.setData('text/plain', this.draggableId);

            this.isDragged = true;
            this.$emit('drag', true);
        },
        onDragEnd(event) {
            const clonedDOMElement = document.documentElement.querySelector('.cloned-list-element');

            event.target.removeAttribute('style');
            document.body.removeChild(clonedDOMElement);

            if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
                // TODO: Only Firefox Error: Modifications are not allowed for this document
                // check why firefox does not support clearData
                event.dataTransfer.clearData();
            }

            this.isDragged = false;
            this.$emit('drag', false);
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-element {
        position: relative;
        display: flex;
        height: 48px;
        padding: 8px 12px;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        user-select: none;
        cursor: grab;

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            content: "";
        }

        &--dragged {
            z-index: 11;
            background-color: $lightGrey;
            box-shadow:
                inset 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                inset 0 3px 1px 0 rgba(0, 0, 0, 0.12),
                inset 0 1px 5px 0 rgba(0, 0, 0, 0.2);
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
            background-color: $background;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
