/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <div class="grid-column__header">
            <slot name="header" />
        </div>
        <slot />
        <ClientOnly v-if="resizeable">
            <GridColumnResizer
                :position="resizerPosition"
                :parent-reference="$el"
                @width-change="onUpdateWidth"
                @resize="onResize" />
        </ClientOnly>
    </div>
</template>
<script>

export default {
    name: 'GridColumn',
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            default: 0,
        },
        /**
         * Determines if column is being able to resize
         */
        resizeable: {
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
            ];
        },
        resizerPosition() {
            return {
                top: '0',
                right: '1.25px',
            };
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
        background-color: $WHITE;
        will-change: width;

        &__header {
            position: sticky;
            top: 0;
            z-index: $Z_INDEX_LVL_2;
            background-color: $WHITESMOKE;
        }
    }
</style>
