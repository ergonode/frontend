/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['grid-advanced-filters', {'grid-advanced-filters--disabled': isFilterExists}]">
        <div class="grid-advanced-filters__header">
            <div class="container">
                <div class="title-container">
                    <span
                        class="grid-advanced-filters__title font--medium-16-24">
                        Filters
                    </span>
                    <NumericBadge :number="filtersNumber" />
                </div>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action font--medium-12-16"
                    @click="onClearAll">
                    Clear all filters
                </span>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action font--medium-12-16"
                    @click="onRemoveAll">
                    Remove all filters
                </span>
                <div class="divider-container">
                    <Divider vertical />
                </div>
            </div>
            <FabButton
                :theme="secondaryTheme"
                @click.native="onExpandFilters">
                <template #icon="{ fillColor }">
                    <IconArrowDouble
                        :fill-color="fillColor"
                        :state="iconExpanderState" />
                </template>
            </FabButton>
        </div>
        <FadeTransition>
            <GridAdvancedFiltersContainer
                v-if="isExpanded"
                @mouseOverFilters="onMouseOverFilters">
                <GridAdvancedFilterPlaceholder v-if="!filters.length" />
                <GridAdvancedFilter
                    v-for="(filter, index) in filters"
                    :key="index"
                    :index="index"
                    :filter="filter"
                    :is-mouse-over-filters="isMouseOverFilters"
                    @mouseOverFilters="onMouseOverFilters"
                    @focus="onFilterFocus"
                    @clear="onClearFilterAtIndex"
                    @apply="onApplyFilter"
                    @update="onUpdateFilterAtIndex"
                    @remove="onRemoveFilterAtIndex"
                    @insert="onInsertFilterAtIndex"
                    @setGhost="onSetGhostFilterAtIndex"
                    @swap="onSwapFiltersPosition"
                    @drop="onDropFilterAtIndex" />
            </GridAdvancedFiltersContainer>
        </FadeTransition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { THEMES } from '@Core/defaults/buttons';
import { ARROW } from '@Core/defaults/icons';
import GridAdvancedFilterPlaceholder from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder';

export default {
    name: 'GridAdvancedFilters',
    components: {
        Divider: () => import('@Core/components/Dividers/Divider'),
        NumericBadge: () => import('@Core/components/Badges/NumericBadge'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconArrowDouble: () => import('@Core/components/Icons/Arrows/IconArrowDouble'),
        GridAdvancedFiltersContainer: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersContainer'),
        GridAdvancedFilter: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilter'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
        GridAdvancedFilterPlaceholder,
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            isExpanded: false,
            iconExpanderState: ARROW.DOWN,
            isMouseOverFilters: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElement: (state) => state.draggedElement,
        }),
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        filtersNumber() {
            return this.filters.filter((filter) => !filter.isGhost).length;
        },
        isFilterExists() {
            const draggedElIndex = this.filters.findIndex(
                (filter) => filter.id === this.draggedElement,
            );

            return draggedElIndex !== -1;
        },
    },
    watch: {
        isListElementDragging() {
            this.isMouseOverFilters = false;

            if (this.isListElementDragging) {
                if (!this.isExpanded) {
                    this.isExpanded = true;
                    this.iconExpanderState = ARROW.UP;
                }
                this.addGhostFilter();
            } else {
                this.removeGhostFilter();
            }
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        ...mapActions('draggable', [
            'setGhostFilterIndex',
        ]),
        onMouseOverFilters(isOver) {
            this.isMouseOverFilters = isOver;
        },
        onDropFilterAtIndex(payload) {
            this.$emit('dropFilter', payload);
        },
        onUpdateFilterAtIndex(payload) {
            this.$emit('updateFilter', payload);
        },
        onRemoveFilterAtIndex(index) {
            this.$emit('removeFilter', index);
        },
        onInsertFilterAtIndex(payload) {
            this.$emit('insertFilter', payload);
        },
        onClearFilterAtIndex(index) {
            this.$emit('clearFilter', index);
        },
        onSetGhostFilterAtIndex(payload) {
            this.$emit('setGhostFilter', payload);
        },
        onSwapFiltersPosition(payload) {
            this.$emit('swapFilters', payload);
        },
        onApplyFilter() {
            this.$emit('applyFilter');
        },
        onFilterFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onExpandFilters() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.iconExpanderState = ARROW.UP;
            } else {
                this.iconExpanderState = ARROW.DOWN;
            }
        },
        onRemoveAll() {
            this.$emit('removeAllFilters');
        },
        onClearAll() {
            this.$emit('clearAllFilters');
        },
        addGhostFilter() {
            if (!this.isFilterExists) {
                const ghostIndex = 0;

                this.onInsertFilterAtIndex({
                    index: ghostIndex,
                    filter: {
                        isGhost: true,
                    },
                });
                this.setGhostFilterIndex(ghostIndex);
            }
        },
        removeGhostFilter() {
            const ghostIndex = this.filters.findIndex(
                (filter) => filter.isGhost,
            );

            if (ghostIndex !== -1 && !this.isMouseOverFilters) {
                this.onRemoveFilterAtIndex(ghostIndex);
                this.setGhostFilterIndex();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filters {
        display: grid;
        grid-auto-flow: row;
        border: 1px solid $GREY;
        margin-bottom: 24px;

        &__title {
            color: $GRAPHITE_DARK;
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 6px 0 16px;
            box-sizing: border-box;
            background-color: $WHITE;
        }

        &__action {
            display: flex;
            align-items: center;
            color: $GRAPHITE_DARK;
            text-decoration: underline;
            cursor: pointer;
        }

        &--disabled {
            pointer-events: none;
        }
    }

    .container {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 16px;
        padding: 12px 0;
    }

    .title-container {
        display: grid;
        grid-auto-flow: column;
        column-gap: 8px;
        align-items: center;
    }

    .divider-container {
        display: flex;
        padding: 4px 0;
    }
</style>
