/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <slot />
        <GridColumnResizer
            v-if="!isDragged"
            @widthChange="onUpdateWidth"
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

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            z-index: $Z_INDEX_LVL_4;
            width: 100%;
            height: 100%;
            box-shadow: $ELEVATOR_2_DP;
            opacity: 1;
            visibility: hidden;
            pointer-events: none;
            content: "";
        }

        &--hovered {
            &::after {
                visibility: visible;
            }
        }
    }
</style>
