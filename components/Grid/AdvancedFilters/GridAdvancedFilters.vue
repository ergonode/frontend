/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['grid-advanced-filters', {'grid-advanced-filters--disabled': disabled}]">
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
                <GridAdvancedFilterPlaceholder v-if="filtersData.length === 0" />
                <template v-for="(filter, index) in filtersData">
                    <GridAdvancedFilter
                        v-if="filter.id !== ghostFilterId"
                        :key="index"
                        :index="index"
                        :data="filter"
                        :filter="filters[filter.id]"
                        :is-mouse-over-filters="isMouseOverFilters"
                        :namespace="namespace"
                        :path="path"
                        @mouseOverFilters="onMouseOverFilters"
                        @focus="onFilterFocus" />
                    <GridAdvancedFilterGhost
                        v-else
                        :key="index"
                        :is-mouse-over-filters="isMouseOverFilters"
                        :namespace="namespace"
                        @mouseOverFilters="onMouseOverFilters" />
                </template>
            </GridAdvancedFiltersContainer>
        </FadeTransition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
            type: Object,
            default: () => {},
        },
        filtersData: {
            type: Array,
            default: () => [],
        },
        namespace: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
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
            return this.filtersData.filter((f) => f.id !== this.ghostFilterId).length;
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
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        onMouseOverFilters(isOver) {
            this.isMouseOverFilters = isOver;
        },
        onFilterFocus(isFocused) {
            this.$emit('focus', isFocused);
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
            this.setDisabledElements(
                this.filtersData
                    .map(({ element_id: elementId, language: languageCode }) => (
                        { languageCode, elementId, isDisabled: false }
                    )),
            );
            this.$store.dispatch(`${this.namespace}/removeAllAdvancedFilters`);
            this.onClearAll();
        },
        onClearAll() {
            this.$store.dispatch(`${this.namespace}/clearAllAdvancedFilters`);
            this.$store.dispatch(`${this.namespace}/getData`, { path: this.path });
            this.$store.dispatch(`${this.namespace}/setCurrentPage`, 1);
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
            @include setFont(medium, medium, medium, $GRAPHITE_DARK);
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
            @include setFont(medium, small, regular, $GRAPHITE_DARK);

            display: flex;
            align-items: center;
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
