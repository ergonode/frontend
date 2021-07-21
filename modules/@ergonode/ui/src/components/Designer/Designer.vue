/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResizeObserver @resize="onResize">
        <div class="designer">
            <DesignerLayers>
                <template #prependLayer>
                    <slot
                        name="prependBody"
                        :rows="rows"
                        :columns="columns"
                        :layer-style="layerStyle" />
                </template>
                <template #backgroundLayer>
                    <slot
                        name="backgroundBody"
                        :rows="rows"
                        :columns="columns"
                        :layer-style="layerStyle">
                        <DesignerBackgroundLayer
                            :style="layerStyle"
                            :columns="columns"
                            :rows="rows">
                            <template #item="{ row, column }">
                                <slot
                                    name="backgroundItem"
                                    :row="row"
                                    :column="column">
                                    <DesignerBackgroundItem
                                        :key="`${column} | ${row}`"
                                        :column="column"
                                        :row="row"
                                        :has-right-border="column + 1 === columns" />
                                </slot>
                            </template>
                        </DesignerBackgroundLayer>
                    </slot>
                </template>
                <template #draggableLayer>
                    <slot
                        name="appendBody"
                        :rows="rows"
                        :columns="columns"
                        :layer-style="layerStyle" />
                </template>
            </DesignerLayers>
            <DesignerFooter ref="footer">
                <Button
                    title="ADD ROW"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    @click.native="onAddRow">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </DesignerFooter>
        </div>
    </ResizeObserver>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import DesignerBackgroundItem from '@UI/components/Designer/DesignerBackgroundItem';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DesignerFooter from '@UI/components/Designer/DesignerFooter';
import DesignerLayers from '@UI/components/Designer/DesignerLayers';
import {
    COLUMNS,
    FOOTER_HEIGHT,
    ROW_HEIGHT,
} from '@UI/defaults/designer';

export default {
    name: 'Designer',
    components: {
        DesignerBackgroundItem,
        DesignerLayers,
        DesignerBackgroundLayer,
        DesignerFooter,
    },
    props: {
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            default: COLUMNS,
        },
        /**
         * The last added item row
         */
        lastItemRow: {
            type: Number,
            default: 0,
        },
        /**
         * The width of each column
         */
        columnWidth: {
            type: String,
            default: '1fr',
        },
        /**
         * Determines the row height
         */
        rowHeight: {
            type: Number,
            default: ROW_HEIGHT,
        },
    },
    data() {
        return {
            rows: 0,
            additionalRows: 0,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
        footerHeight() {
            return FOOTER_HEIGHT;
        },
        layerStyle() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, ${this.columnWidth})`,
                gridTemplateRows: `repeat(${this.rows}, ${this.rowHeight}px)`,
            };
        },
    },
    watch: {
        lastItemRow() {
            this.setRows(Math.max(this.lastItemRow + 1, this.rows));
        },
    },
    methods: {
        onResize(entry) {
            const {
                height,
            } = entry.contentRect;

            const maxRow = Math.max(
                1,
                Math.ceil((height - this.footerHeight) / this.rowHeight) - 1,
            );

            this.setRows(maxRow);
        },
        onAddRow() {
            this.additionalRows += 1;
            this.rows += 1;

            requestAnimationFrame(() => {
                this.$refs.footer.$el.scrollIntoView(true);
            });

            this.$emit('rows', this.rows);
        },
        setRows(rows) {
            this.rows = Math.max(this.lastItemRow, rows) + this.additionalRows;

            this.$emit('rows', this.rows);
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
    }
</style>
