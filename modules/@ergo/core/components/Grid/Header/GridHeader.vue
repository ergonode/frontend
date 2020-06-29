/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        :class="['grid-header', {
            'grid-header--borders': isCenteredView,
            'grid-header--disabled': isFilterExists
        }]">
        <GridDropZone
            v-show="isListElementDragging && !isFilterExists"
            :orientation="horizontalOrientation"
            title="ADD FILTER"
            @drop="onDropFilter">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </GridDropZone>
        <div class="grid-header__settings">
            <div class="grid-header__actions">
                <!-- TODO: Uncomment when mass actions are implemented-->
                <!-- <ActionButton
                    title="ACTIONS"
                    :theme="isActionsSelected ? theme.PRIMARY : theme.SECONDARY"
                    :size="smallSize"
                    :options="[]">
                    <template #icon="{ color }">
                        <IconArrowDropDown :fill-color="color" />
                    </template>
                </ActionButton> -->
                <ExpandNumericButton
                    v-if="isAdvancedFilters"
                    title="FILTERS"
                    :number="filtersNumber"
                    :is-expanded="isFiltersExpanded"
                    @click.native="onFiltersExpand" />
                <slot name="actions" />
            </div>
            <div class="grid-header__layout-configuration">
                <GridTableLayoutActivator
                    :is-selected="layout === gridLayouts.TABLE"
                    @active="onLayoutActivate" />
                <GridCollectionLayoutActivator
                    v-if="isCollectionLayout"
                    :is-selected="layout === gridLayouts.COLLECTION"
                    @active="onLayoutActivate" />
                <Fab
                    :theme="theme.SECONDARY"
                    @click.native="onShowModal">
                    <template #icon="{ color }">
                        <IconSettings :fill-color="color" />
                    </template>
                </Fab>
                <slot name="configuration" />
            </div>
        </div>
        <GridSettingsModalForm
            v-if="isSettingsModal"
            :table-layout-config="tableLayoutConfig"
            :collection-layout-config="collectionLayoutConfig"
            :is-collection-layout="isCollectionLayout"
            @close="onCloseModal"
            @apply="onApplySettings" />
        <GridAdvancedFiltersContainer v-show="isFiltersExpanded && isAdvancedFilters">
            <GridAdvancedFilter
                v-for="(filter, index) in filters"
                :key="index"
                :index="index"
                :filter="filter"
                @apply="onApplyFilter"
                @update="onUpdateFilterAtIndex"
                @clear="onClearFilterAtIndex"
                @remove="onRemoveFilterAtIndex"
                @swap="onSwapFiltersPosition" />
            <GridAdvancedFilterPlaceholder v-if="!filters.length && !isListElementDragging" />
            <GridAdvancedFiltersRemoveAllButton
                v-show="filtersNumber"
                @click.native="onRemoveAll" />
        </GridAdvancedFiltersContainer>
    </div>
</template>

<script>
import GridDropZone from '@Core/components/Grid/GridDropZone';
import GridCollectionLayoutActivator from '@Core/components/Grid/Layout/Collection/GridCollectionLayoutActivator';
import GridTableLayoutActivator from '@Core/components/Grid/Layout/Table/GridTableLayoutActivator';
import {
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridHeader',
    components: {
        GridTableLayoutActivator,
        GridCollectionLayoutActivator,
        GridDropZone,
        IconAddFilter: () => import('@Core/components/Icons/Actions/IconAddFilter'),
        GridSettingsModalForm: () => import('@Core/components/Grid/Modals/GridSettingsModalForm'),
        // ActionButton: () => import('@Core/components/Buttons/ActionButton'),
        ExpandNumericButton: () => import('@Core/components/Buttons/ExpandNumericButton'),
        Fab: () => import('@Core/components/Buttons/Fab'),
        IconSettings: () => import('@Core/components/Icons/Actions/IconSettings'),
        // IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
        GridAdvancedFiltersContainer: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersContainer'),
        GridAdvancedFilter: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilter'),
        GridAdvancedFiltersRemoveAllButton: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersRemoveAllButton'),
        GridAdvancedFilterPlaceholder: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder'),
    },
    props: {
        tableLayoutConfig: {
            type: Object,
            required: true,
        },
        collectionLayoutConfig: {
            type: Object,
            required: true,
        },
        layout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
        },
        filters: {
            type: Array,
            default: () => [],
        },
        isActionsSelected: {
            type: Boolean,
            default: false,
        },
        isCenteredView: {
            type: Boolean,
            default: false,
        },
        isAdvancedFilters: {
            type: Boolean,
            default: false,
        },
        isCollectionLayout: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFiltersExpanded: false,
            isSettingsModal: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        filtersNumber() {
            return this.filters.length;
        },
        isFilterExists() {
            const draggedElIndex = this.filters.findIndex(
                filter => filter.id === this.draggedElement,
            );

            return draggedElIndex !== -1 && this.isAdvancedFilters;
        },
        theme() {
            return THEME;
        },
        iconExpandedState() {
            return this.isFiltersExpanded ? ARROW.UP : ARROW.DOWN;
        },
        gridLayouts() {
            return GRID_LAYOUT;
        },
    },
    methods: {
        ...mapActions('draggable', [
            'setGhostIndex',
        ]),
        onLayoutActivate(layout) {
            this.$emit('layoutChange', layout);
        },
        onFiltersExpand() {
            this.isFiltersExpanded = !this.isFiltersExpanded;
        },
        onShowModal() {
            this.isSettingsModal = true;
        },
        onCloseModal() {
            this.isSettingsModal = false;
        },
        onApplySettings(payload) {
            this.isSettingsModal = false;
            this.$emit('applySettings', payload);
        },
        onDropFilter(id) {
            this.$emit('dropFilter', id);
        },
        onUpdateFilterAtIndex(payload) {
            this.$emit('updateFilter', payload);
        },
        onClearFilterAtIndex(payload) {
            this.$emit('clearFilter', payload);
        },
        onRemoveFilterAtIndex(index) {
            this.$emit('removeFilter', index);
        },
        onSwapFiltersPosition(payload) {
            this.$emit('swapFilters', payload);
        },
        onApplyFilter() {
            this.$emit('applyFilter');
        },
        onRemoveAll() {
            this.$emit('removeAllFilters');
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-header {
        position: relative;
        display: flex;
        flex-direction: column;
        padding-bottom: 16px;
        box-sizing: border-box;
        background-color: $WHITE;
        border-left: $BORDER_1_GREY;

        &__settings {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 16px 0;
            box-sizing: border-box;
            background-color: $WHITE;
        }

        &__layout-configuration {
            display: flex;
            align-items: center;
        }

        &__actions {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 8px;
        }

        &--borders {
            border-top: $BORDER_1_GREY;
            border-right: $BORDER_1_GREY;
        }

        &--disabled {
            pointer-events: none;
        }
    }
</style>
