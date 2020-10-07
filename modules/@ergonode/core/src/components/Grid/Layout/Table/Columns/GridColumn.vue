/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
        <GridColumnResizer
            v-if="!isDragged"
            @width-change="onUpdateWidth"
            @resize="onResize" />
    </div>
</template>
<script>

export default {
    name: 'GridDraggableColumn',
    components: {
        GridColumnResizer: () => import('@Core/components/Grid/Layout/Table/Columns/Resizer/GridColumnResizer'),
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        isDragged: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            columnWidth: 0,
        };
    },
    computed: {
        classes() {
            return [
                'grid-column',
                {
                    'grid-column--dragged': this.isDragged,
                },
            ];
        },
    },
    methods: {
        onUpdateWidth(width) {
            this.$emit('resize', {
                index: this.index,
                width,
            });
        },
        onResize(isResizing) {
            this.$el.setAttribute('draggable', !isResizing);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-column {
        position: relative;
        display: grid;
        box-sizing: border-box;
        background-color: $WHITE;
        will-change: width;

        & > .grid-table-cell:nth-child(1) {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
