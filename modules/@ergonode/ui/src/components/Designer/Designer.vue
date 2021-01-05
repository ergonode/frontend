/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResizeObserver @resize="onResize">
        <div class="designer">
            <DesignerBody>
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
                                :row="row" />
                        </slot>
                    </template>
                </DesignerBackgroundLayer>
                <slot
                    name="body"
                    :rows="rows"
                    :layer-style="layerStyle" />
            </DesignerBody>
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
import Button from '@UI/components/Button/Button';
import DesignerBackgroundItem from '@UI/components/Designer/DesignerBackgroundItem';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DesignerBody from '@UI/components/Designer/DesignerBody';
import DesignerFooter from '@UI/components/Designer/DesignerFooter';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import ResizeObserver from '@UI/components/Observers/ResizeObserver';
import {
    ROW_HEIGHT,
} from '@UI/defaults/designer';

export default {
    name: 'Designer',
    components: {
        DesignerBackgroundItem,
        DesignerBody,
        DesignerBackgroundLayer,
        DesignerFooter,
        Button,
        IconAdd,
        ResizeObserver,
    },
    props: {
        /**
         * Number of visible columns
         */
        columns: {
            type: Number,
            default: 0,
        },
        /**
         * The last added item row
         */
        lastItemRow: {
            type: Number,
            default: 0,
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
            return 64;
        },
        layerStyle() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridTemplateRows: `repeat(${this.rows}, ${this.rowHeight}px)`,
            };
        },
    },
    watch: {
        lastItemRow() {
            this.setRows(this.rows);
        },
    },
    methods: {
        onResize(entry) {
            const {
                height,
            } = entry.contentRect;
            const maxRow = Math.ceil((height - this.footerHeight) / this.rowHeight);

            this.rows = Math.max(this.lastItemRow, maxRow) + this.additionalRows;

            this.setRows(maxRow);
        },
        onAddRow() {
            this.additionalRows += 1;
            this.rows += 1;

            requestAnimationFrame(() => {
                this.$refs.footer.$el.scrollIntoView(true);
            });
        },
        setRows(rows) {
            this.rows = Math.max(this.lastItemRow, rows) + this.additionalRows;
        },
    },
};
</script>

<style lang="scss" scoped>
    .designer {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        height: 0;
        padding: 24px 24px 0;
        overflow: auto;
    }
</style>