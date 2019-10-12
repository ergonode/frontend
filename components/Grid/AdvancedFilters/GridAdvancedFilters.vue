/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="grid-advanced-filters">
        <div class="grid-advanced-filters__header">
            <div class="container">
                <div class="title-container">
                    <span
                        class="grid-advanced-filters__title">
                        Filters
                    </span>
                    <NumericBadge :number="filtersNumber" />
                </div>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action"
                    @click="onClearAll">
                    Clear all filters
                </span>
                <div class="divider-container">
                    <Divider vertical />
                </div>
                <span
                    class="grid-advanced-filters__action"
                    @click="onRemoveAll">
                    Remove all filters
                </span>
                <div class="divider-container">
                    <Divider vertical />
                </div>
            </div>
            <IconFabButton
                theme="secondary"
                icon-path="Arrows/IconArrowDouble"
                :is-selected="isExpanded"
                @select="onExpandFilters">
                <template #icon="{ iconFillColor }">
                    <IconArrowDouble
                        :fill-color="iconFillColor"
                        :state="iconExpanderState" />
                </template>
            </IconFabButton>
        </div>
        <FadeTransition>
            <GridAdvancedFiltersContainer
                v-if="isExpanded"
                @mouseOverFilters="onMouseOverFilters">
                <GridAdvancedFilterPlaceholder v-if="filters.length === 0" />
                <template v-for="(filter, index) in filters">
                    <GridAdvancedFilter
                        v-if="filter.id !== ghostFilterId"
                        :key="index"
                        :index="index"
                        :filter="filter"
                        :is-mouse-over-filters="isMouseOverFilters"
                        :store-namespace="storeNamespace"
                        @mouseOverFilters="onMouseOverFilters" />
                    <GridAdvancedFilterGhost
                        v-else
                        :key="index"
                        :is-mouse-over-filters="isMouseOverFilters"
                        :store-namespace="storeNamespace"
                        @mouseOverFilters="onMouseOverFilters" />
                </template>
            </GridAdvancedFiltersContainer>
        </FadeTransition>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Arrow } from '~/model/icons/Arrow';
import { GHOST_ID } from '~/defaults/grid/main';
import GridAdvancedFilterPlaceholder from '~/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder';
import GridAdvancedFilterGhost from '~/components/Grid/AdvancedFilters/GridAdvancedFilterGhost';

export default {
    name: 'GridAdvancedFilters',
    components: {
        Divider: () => import('~/components/Dividers/Divider'),
        NumericBadge: () => import('~/components/Badges/NumericBadge'),
        IconFabButton: () => import('~/components/Buttons/IconFabButton'),
        IconArrowDouble: () => import('~/components/Icon/Arrows/IconArrowDouble'),
        GridAdvancedFiltersContainer: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFiltersContainer'),
        GridAdvancedFilter: () => import('~/components/Grid/AdvancedFilters/GridAdvancedFilter'),
        FadeTransition: () => import('~/components/Transitions/FadeTransition'),
        GridAdvancedFilterPlaceholder,
        GridAdvancedFilterGhost,
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
        storeNamespace: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isExpanded: false,
            iconExpanderState: Arrow.DOWN,
            isMouseOverFilters: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
        }),
        ghostFilterId() {
            return GHOST_ID;
        },
        filtersNumber() {
            return this.filters.filter((f) => f.id !== this.ghostFilterId).length;
        },
    },
    watch: {
        isListElementDragging() {
            if (!this.isExpanded && this.isListElementDragging) {
                this.isExpanded = true;
            }
        },
    },
    methods: {
        onMouseOverFilters(isOver) {
            this.isMouseOverFilters = isOver;
        },
        onExpandFilters(isExpanded) {
            this.isExpanded = isExpanded;

            if (this.isExpanded) {
                this.iconExpanderState = Arrow.UP;
            } else {
                this.iconExpanderState = Arrow.DOWN;
            }
        },
        onRemoveAll() {
            this.$store.dispatch(`${this.storeNamespace}/removeAllAdvancedFilters`);
        },
        onClearAll() {
            this.$store.dispatch(`${this.storeNamespace}/clearAllAdvancedFilters`);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filters {
        display: grid;
        grid-auto-flow: row;
        border: 1px solid $grey;
        margin-bottom: 24px;

        &__title {
            @include setFont(medium, medium, medium, $darkGraphite);
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 6px 0 16px;
            box-sizing: border-box;
            background-color: $white;
        }

        &__action {
            @include setFont(medium, small, regular, $darkGraphite);

            display: flex;
            align-items: center;
            text-decoration: underline;
            cursor: pointer;
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
