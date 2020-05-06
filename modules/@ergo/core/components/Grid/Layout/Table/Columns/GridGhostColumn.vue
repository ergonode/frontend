/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="[
            'ghost-column',
            { 'ghost-column--highlighted': isHighlighted },
        ]"
        @dragover="onDragOver"
        @drop="onDrop">
        <div class="container">
            <IconAddColumn :fill-color="addIconFillColor" />
            <span class="ghost-column__title">ADD COLUMN</span>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {
    WHITE, GRAPHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    isMouseOutOfBoundsElement,
    isMouseInsideElement,
    getPositionForBrowser,
} from '@Core/models/drag_and_drop/helpers';

export default {
    name: 'GridGhostColumn',
    components: {
        IconAddColumn: () => import('@Core/components/Icons/Actions/IconAddColumn'),
    },
    data() {
        return {
            isHighlighted: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            draggedElement: state => state.draggedElement,
            ghostIndex: state => state.ghostIndex,
            draggedElIndex: state => state.draggedElIndex,
        }),
        addIconFillColor() {
            return this.isHighlighted ? WHITE : GRAPHITE;
        },
    },
    created() {
        const gridTableLayoutElement = this.getTableLayoutElement();

        if (gridTableLayoutElement) {
            gridTableLayoutElement.addEventListener('dragenter', this.onDragEnter);
            gridTableLayoutElement.addEventListener('dragleave', this.onDragLeave);
        }
    },
    beforeDestroy() {
        const gridTableLayoutElement = this.getTableLayoutElement();

        if (gridTableLayoutElement) {
            gridTableLayoutElement.removeEventListener('dragenter', this.onDragEnter);
            gridTableLayoutElement.removeEventListener('dragleave', this.onDragLeave);
        }
    },
    methods: {
        ...mapActions('draggable', [
            'setDraggedElement',
            'setDraggedElIndex',
            'setGhostIndex',
        ]),
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            event.preventDefault();

            if (typeof this.draggedElement !== 'object') {
                const columnId = event.dataTransfer.getData('text/plain');

                this.$emit('drop', {
                    from: this.draggedElIndex,
                    to: this.ghostIndex,
                    columnId,
                });
                this.setGhostIndex();
                this.setDraggedElIndex();
                this.setDraggedElement();
            }
        },
        getTableLayoutElement() {
            return document.documentElement.querySelector('.columns-section');
        },
        onDragEnter(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (xPos === 0 && yPos === 0) return false;

            const borderOffset = 1;
            const gridTableLayoutElement = this.getTableLayoutElement();
            const isInside = isMouseInsideElement(
                gridTableLayoutElement,
                xPos,
                yPos + borderOffset,
            );

            if (isInside) {
                this.isHighlighted = true;
            }

            return true;
        },
        onDragLeave(event) {
            const { xPos, yPos } = getPositionForBrowser(event);

            if (xPos === 0 && yPos === 0) return false;

            const gridTableLayoutElement = this.getTableLayoutElement();
            const isOutOfBounds = isMouseOutOfBoundsElement(gridTableLayoutElement, xPos, yPos);

            if (isOutOfBounds) {
                this.isHighlighted = false;
            }

            return true;
        },
    },
};
</script>

<style lang="scss" scoped>
    .ghost-column {
        $column: &;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 80px;
        background-color: $GREY_LIGHT;
        box-shadow: $ELEVATOR_HOLE;
        overflow: auto;
        min-width: 150px;

        &__title {
            margin-top: 8px;
            color: $GRAPHITE;
            font: $FONT_BOLD_12_16;
        }

        &--highlighted {
            background-color: $GREEN;

            #{$column}__title {
                color: $WHITE;
            }
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
