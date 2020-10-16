/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <DropZone
            v-show="isListElementDragging && !isFilterExists"
            :layout-orientation="horizontalOrientation"
            title="ADD FILTER"
            @drop="onDropFilter">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </DropZone>
        <GridHeaderSettings>
            <template #actions>
                <ExpandNumericButton
                    v-if="isAdvancedFilters"
                    title="FILTERS"
                    :number="filtersCount"
                    :is-expanded="isFiltersExpanded"
                    @click.native="onFiltersExpand" />
                <slot name="actions" />
            </template>
            <template #configuration>
                <GridTableLayoutActivator
                    data-cy="grid-table-view"
                    :is-selected="layout === gridLayouts.TABLE"
                    @active="onLayoutActivate" />
                <GridCollectionLayoutActivator
                    data-cy="grid-collection-view"
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
            </template>
        </GridHeaderSettings>
        <GridSettingsModalForm
            v-if="isSettingsModal"
            :table-layout-config="tableLayoutConfig"
            :collection-layout-config="collectionLayoutConfig"
            :is-collection-layout="isCollectionLayout"
            @close="onCloseModal"
            @apply="onApplySettings" />
        <GridAdvancedFilters
            v-show="isFiltersExpanded && isAdvancedFilters"
            :filters="filters"
            :filter-values="filterValues"
            @remove="onRemoveFilter"
            @remove-all="onRemoveAllFilters"
            @filter="onFilter"
            @exists="onFilterExists" />
        <slot name="panel" />
    </div>
</template>

<script>
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import DropZone from '@Core/components/DropZone/DropZone';
import Fab from '@Core/components/Fab/Fab';
import GridAdvancedFilters from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilters';
import GridHeaderSettings from '@Core/components/Grid/Header/GridHeaderSettings';
import GridCollectionLayoutActivator from '@Core/components/Grid/Layout/Collection/GridCollectionLayoutActivator';
import GridTableLayoutActivator from '@Core/components/Grid/Layout/Table/GridTableLayoutActivator';
import IconAddFilter from '@Core/components/Icons/Actions/IconAddFilter';
import IconSettings from '@Core/components/Icons/Actions/IconSettings';
import {
    DRAGGED_ELEMENT,
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    LAYOUT_ORIENTATION,
} from '@Core/defaults/layout';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    mapState,
} from 'vuex';

export default {
    name: 'GridHeader',
    components: {
        GridTableLayoutActivator,
        GridCollectionLayoutActivator,
        GridHeaderSettings,
        GridAdvancedFilters,
        DropZone,
        IconAddFilter,
        ExpandNumericButton,
        Fab,
        IconSettings,
        GridSettingsModalForm: () => import('@Core/components/Grid/Modals/GridSettingsModalForm'),
    },
    props: {
        /**
         * Configuration of table layout
         */
        tableLayoutConfig: {
            type: Object,
            required: true,
        },
        /**
         * Configuration of collection layout
         */
        collectionLayoutConfig: {
            type: Object,
            required: true,
        },
        /**
         * Current selected grid layout
         */
        layout: {
            type: String,
            default: GRID_LAYOUT.TABLE,
        },
        /**
         * List of advanced filters
         */
        filters: {
            type: Array,
            default: () => [],
        },
        /**
         * Selected filter values
         */
        filterValues: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines if advanced filters are visible
         */
        isAdvancedFilters: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if collection layout might be chosen
         */
        isCollectionLayout: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFiltersExpanded: false,
            isFilterExists: false,
            isSettingsModal: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        classes() {
            return [
                'grid-header',
                {
                    'grid-header--disabled': this.isFilterExists && this.isListElementDragging,
                },
            ];
        },
        filtersCount() {
            return this.filters.length;
        },
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        horizontalOrientation() {
            return LAYOUT_ORIENTATION.HORIZONTAL;
        },
        theme() {
            return THEME;
        },
        gridLayouts() {
            return GRID_LAYOUT;
        },
    },
    methods: {
        onLayoutActivate(layout) {
            this.$emit('layout-change', layout);
        },
        onFilterExists(isExist) {
            this.isFilterExists = isExist;
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

            this.$emit('apply-settings', payload);
        },
        onDropFilter(id) {
            this.$emit('drop-filter', id);
        },
        onFilter(filters) {
            this.$emit('filter', filters);
        },
        onRemoveFilter(payload) {
            this.$emit('remove-filter', payload);
        },
        onRemoveAllFilters() {
            this.$emit('remove-all-filter');
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

        &--disabled {
            pointer-events: none;
        }
    }
</style>
