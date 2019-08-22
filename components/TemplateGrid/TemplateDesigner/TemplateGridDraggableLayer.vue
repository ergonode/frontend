/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="draggable-layer">
        <TemplateGridGhostItem
            v-for="(position, index) in gridLayerPositions"
            :key="index"
            :style="{ gridArea: `${position.row} / ${position.column} / auto / auto` }"
            :position="position"
            :highlighting-positions="highlightedPositions"
            @drop="onDrop" />
        <LayoutElement
            v-for="(element, index) in layoutElements"
            :key="`${element.row}/${element.column}`"
            :style="getItemPosition(element)"
            :index="index"
            :element="element"
            :columns-number="columnsNumber"
            :rows-number="rowsNumber"
            :disabled="!isUserAllowedToUpdate"
            @highlightedPositionChange="onHighlightedPositionsChange"
            @resizingElMaxRow="onResizingElMaxRow">
            <template v-slot:content>
                <AttributeElementContent
                    v-if="element.type !== 'SECTION TITLE'"
                    :element="element"
                    :disabled="!isUserAllowedToUpdate"
                    :index="index" />
                <SectionElementContent
                    v-else
                    :element="element"
                    :index="index"
                    :disabled="!isUserAllowedToUpdate"
                    @editTitle="onEditSectionTitle" />
            </template>
        </LayoutElement>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {
    getHighlightingLayoutDropPositions,
} from '~/model/template_designer/layout/LayoutCalculations';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateDesigner/TemplateGridGhostItem';
import LayoutElement from '~/components/Template/TemplateDesigner/LayoutElement';
import AttributeElementContent from '~/components/Template/TemplateDesigner/AttributeElementContent';
import SectionElementContent from '~/components/Template/TemplateDesigner/SectionElementContent';

export default {
    name: 'TemplateGridDraggableLayer',
    components: {
        TemplateGridGhostItem,
        LayoutElement,
        AttributeElementContent,
        SectionElementContent,
    },
    props: {
        columnsNumber: {
            type: Number,
            required: true,
        },
        rowsNumber: {
            type: Number,
            required: true,
        },
        layoutElements: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data() {
        return {
            highlightedPositions: [],
        };
    },
    watch: {
        isListElementDragging() {
            if (this.isListElementDragging) {
                this.highlightedPositions = getHighlightingLayoutDropPositions({
                    draggedElWidth: 1,
                    draggedElHeight: 1,
                    layoutWidth: this.columnsNumber,
                    layoutHeight: this.rowsNumber,
                    layoutElements: this.layoutElements,
                });
            } else {
                this.highlightedPositions = [];
            }
        },
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
        }),
        isUserAllowedToUpdate() {
            return this.$canIUse('TEMPLATE_DESIGNER_UPDATE');
        },
        gridLayerPositions() {
            const length = this.rowsNumber * this.columnsNumber;
            const positions = [];

            for (let i = 1; i <= length; i += 1) {
                const row = Math.ceil(i / this.columnsNumber);
                const tmpColumn = i % this.columnsNumber;
                const column = tmpColumn !== 0 ? tmpColumn : this.columnsNumber;

                positions.push({
                    row,
                    column,
                });
            }

            return positions;
        },
    },
    methods: {
        onDrop(position) {
            this.highlightedPositions = [];

            this.$emit('addListElementToLayout', position);
        },
        onEditSectionTitle(index) {
            this.$emit('editSectionTitle', index);
        },
        onHighlightedPositionsChange(positions) {
            this.highlightedPositions = positions;
        },
        onResizingElMaxRow(row) {
            this.$emit('resizingElMaxRow', row);
        },
        getItemPosition({
            row, column, width, height,
        }) {
            return { gridArea: `${row} / ${column} / ${row + height} / ${column + width}` };
        },
    },
};
</script>

<style lang="scss" scoped>
    $border: 1px dashed $grey;

    .draggable-layer {
        position: relative;
        z-index: 3;
        display: grid;
        height: 0;
        flex-grow: 1;
        border-top: $border;
        border-right: $border;
    }
</style>
