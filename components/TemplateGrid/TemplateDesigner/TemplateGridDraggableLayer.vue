<template>
    <div class="draggable-layer">
        <TemplateGridGhostItem
            v-for="(position, index) in gridLayerPositions"
            :key="index"
            :style="{ gridArea: `${position.row} / ${position.column} / auto / auto` }"
            :position="position"
            :highlighting-positions="highlightedPositions"
            :min-highlighted-column="minHighlightedColumn"
            :max-highlighted-column="maxHighlightedColumn"
            :min-highlighted-row="minHighlightedRow"
            :max-highlighted-row="maxHighlightedRow"
            @drop="onDrop" />
        <LayoutElement
            v-for="(element, index) in layoutElements"
            :key="`${element.row}/${element.column}`"
            :style="getGhostItemPosition(element)"
            :index="index"
            :element="element"
            :columns-number="columnsNumber"
            :rows-number="rowsNumber"
            @highlightedPositionChange="onHighlightedPositionsChange" />
    </div>
</template>

<script>
import {
    getMaxObjectValueInArrayByObjectKey,
    getMinObjectValueInArrayByObjectKey,
} from '~/model/arrayWrapper';

export default {
    name: 'TemplateGridDraggableLayer',
    components: {
        TemplateGridGhostItem: () => import('~/components/TemplateGrid/TemplateDesigner/TemplateGridGhostItem'),
        LayoutElement: () => import('~/components/Template/TemplateDesigner/LayoutElement'),
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
            minHighlightedRow: 0,
            maxHighlightedRow: 0,
            minHighlightedColumn: 0,
            maxHighlightedColumn: 0,
        };
    },
    computed: {
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
            this.minHighlightedRow = 0;
            this.maxHighlightedRow = 0;
            this.minHighlightedColumn = 0;
            this.maxHighlightedColumn = 0;

            this.$emit('addListElementToLayout', position);
        },
        onHighlightedPositionsChange(positions) {
            this.highlightedPositions = positions;

            this.maxHighlightedRow = getMaxObjectValueInArrayByObjectKey(positions, 'row');
            this.minHighlightedRow = getMinObjectValueInArrayByObjectKey(positions, 'row');
            this.minHighlightedColumn = getMinObjectValueInArrayByObjectKey(positions, 'column');
            this.maxHighlightedColumn = getMaxObjectValueInArrayByObjectKey(positions, 'column');
        },
        getGhostItemPosition({
            row, column, width, height,
        }) {
            return { gridArea: `${row} / ${column} / ${row + height} / ${column + width}` };
        },
    },
};
</script>

<style lang="scss" scoped>
    .draggable-layer {
        position: relative;
        z-index: 3;
        display: grid;
        height: 0;
        flex-grow: 1;
    }
</style>
