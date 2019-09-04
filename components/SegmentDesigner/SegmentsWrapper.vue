/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="segments-wrapper">
        <TemplateGridHeader
            :style="gridHeaderStyles"
            :columns="columns" />
        <TemplateGridContainer
            :columns="columns"
            :rows="rowsCount"
            :rows-height="rowsHeight"
            :tree-data="filteredSegments">
            <TemplateGridPresentationLayer
                :style="gridStyles"
                :columns="columns"
                :rows="rowsCount" />
            <TemplateGridItemsContainer
                :style="gridStyles">
                <TemplateGridItemArea
                    v-for="item in filteredSegments"
                    :key="item.id"
                    :item="item"
                    :columns="columns"
                    :rows-height="rowsHeight"
                    :is-connections-visible="false">
                    <TemplateGridGhostItem
                        v-if="item.ghost" />
                    <SegmentItem
                        v-else
                        :item-name="item.name || item.code" />
                </TemplateGridItemArea>
            </TemplateGridItemsContainer>
        </TemplateGridContainer>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TemplateGridPresentationLayer from '~/components/TemplateGrid/TemplateGridPresentationLayer';
import TemplateGridItemsContainer from '~/components/TemplateGrid/TemplateGridItemsContainer';
import TemplateGridContainer from '~/components/TemplateGrid/TemplateGridContainer';
import TemplateGridGhostItem from '~/components/TemplateGrid/TemplateGridGhostItem';
import TemplateGridItemArea from '~/components/TemplateGrid/TemplateGridItemArea';
import TemplateGridHeader from '~/components/TemplateGrid/TemplateGridHeader';
import SegmentItem from '~/components/SegmentDesigner/SegmentItem';

export default {
    name: 'SegmentsWrapper',
    components: {
        TemplateGridPresentationLayer,
        TemplateGridItemsContainer,
        TemplateGridContainer,
        TemplateGridGhostItem,
        TemplateGridItemArea,
        TemplateGridHeader,
        SegmentItem,
    },
    computed: {
        ...mapState('segments', {
            columns: state => state.columns,
            rowsHeight: state => state.rowsHeight,
            rowsCount: state => state.rowsCount,
            segmentsData: state => state.segmentsData,
        }),
        gridStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: `${this.rowsHeight}px`,
            };
        },
        gridHeaderStyles() {
            return {
                gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
                gridAutoRows: '50px',
            };
        },
        filteredSegments() {
            return this.segmentsData.filter(
                item => item.column < this.columns,
            );
        },
    },
};
</script>

<style lang="scss" scoped>
    .segments-wrapper {
        z-index: 20;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        justify-content: space-between;
        height: 0;
        padding: 0 12px;
    }

    .bounce-enter-active, .bounce-leave-active {
        transform-origin: top left;
    }

    .bounce-enter-active {
        animation: bounce-in 0.4s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.4s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(1, 0);
        }

        100% {
            transform: scale(1);
        }
    }
</style>
