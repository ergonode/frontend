/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <DropZone
            v-show="isListElementDragging && !isFilterExists"
            :orientation="horizontalOrientation"
            title="ADD FILTER"
            @drop="onDropFilter">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </DropZone>
        <GridHeaderSettings>
            <template #actions>
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
                <slot name="actions" />
            </template>
            <template #configuration>
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
            @filter="onFilter"
            @count="onFiltersCountChange"
            @exists="onFilterExists" />
    </div>
</template>

<script>
import DropZone from '@Core/components/DropZone/DropZone';
import GridAdvancedFilters from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilters';
import GridHeaderSettings from '@Core/components/Grid/Header/GridHeaderSettings';
import GridCollectionLayoutActivator from '@Core/components/Grid/Layout/Collection/GridCollectionLayoutActivator';
import GridTableLayoutActivator from '@Core/components/Grid/Layout/Table/GridTableLayoutActivator';
import {
    DRAGGED_ELEMENT,
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
    insertCookieAtIndex,
} from '@Core/models/cookies';
import {
    mapActions,
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
        IconAddFilter: () => import('@Core/components/Icons/Actions/IconAddFilter'),
        GridSettingsModalForm: () => import('@Core/components/Grid/Modals/GridSettingsModalForm'),
        // ActionButton: () => import('@Core/components/ActionButton/ActionButton'),
        ExpandNumericButton: () => import('@Core/components/Buttons/ExpandNumericButton'),
        Fab: () => import('@Core/components/Fab/Fab'),
        IconSettings: () => import('@Core/components/Icons/Actions/IconSettings'),
        // IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
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
            isFilterExists: false,
            isSettingsModal: false,
            filtersCount: 0,
        };
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        classes() {
            return [
                'grid-header',
                {
                    'grid-header--disabled': this.isFilterExists && this.isListElementDragging,
                },
            ];
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
        onFiltersCountChange(count) {
            this.filtersCount = count;
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
            this.$emit('applySettings', payload);
        },
        onDropFilter(id) {
            insertCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index: 0,
                data: id,
            });

            this.$emit('dropFilter', id);
        },
        onFilter(filters) {
            this.$emit('filter', filters);
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
