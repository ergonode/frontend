/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="grid-scroll"
        @scroll="onScroll">
        <slot />
    </div>
</template>

<script>
import { topBound, bottomBound } from '~/model/scroll/boundaryScroll';
import { debounce } from 'debounce';

export default {
    name: 'TemplateGridScroll',
    props: {
        dataRowLength: {
            type: Number,
            required: true,
        },
        rowsHeight: {
            type: Number,
            required: true,
        },
    },
    data: () => ({
        isBottomBoundReached: false,
        isTopBoundReached: true,
    }),
    mounted() {
        this.calculateRowsCount(0);
        window.addEventListener('resize', this.calculateRowsCount);
    },
    destroyed() {
        window.removeEventListener('resize', this.calculateRowsCount);
    },
    methods: {
        calculateRowsCount(time = 300) {
            debounce(() => {
                const { clientHeight } = document.querySelector('.grid-scroll-wrapper');
                const visibleRows = Math.ceil(clientHeight / this.rowsHeight);
                const totalRows = Math.max(this.dataRowLength, visibleRows) + 1;
                this.$emit('setRowsCount', totalRows);
            }, time)();
        },
        onScroll(event) {
            const { target } = event;
            const { clientHeight: visible, scrollTop, scrollHeight } = target;
            this.isBottomBoundReached = bottomBound({
                yOffset: Math.round(scrollTop) + visible,
                maxHeight: scrollHeight,
            });
            this.isTopBoundReached = topBound({
                yOffset: scrollTop,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-scroll-wrapper {
        position: relative;
        z-index: 20;
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;

        & .grid-scroll {
            position: relative;
            height: 100%;
            overflow: auto;
        }

        &--top-gradient::before,
        &--bottom-gradient::after {
            position: absolute;
            left: 0;
            z-index: 2;
            display: block;
            width: 100%;
            height: 48px;
            content: "";
        }

        &--top-gradient::before {
            top: 0;
            background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, $white 100%);
        }

        &--bottom-gradient::after {
            bottom: 0;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, $white 100%);
        }
    }
</style>
