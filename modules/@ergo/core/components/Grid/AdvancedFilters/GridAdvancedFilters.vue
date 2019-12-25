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
import { THEMES } from '@Core/defaults/buttons';
import { ARROW } from '~/defaults/icons';
import { GHOST_ID } from '@Core/defaults/grid';
import GridAdvancedFilterPlaceholder from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder';
import GridAdvancedFilterGhost from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterGhost';
import { ADV_FILTERS_IDS } from '@Core/defaults/grid/cookies';

export default {
    name: 'GridAdvancedFilters',
    components: {
        Divider: () => import('@Core/components/Dividers/Divider'),
        NumericBadge: () => import('@Core/components/Badges/NumericBadge'),
        FabButton: () => import('@Core/components/Buttons/FabButton'),
        IconArrowDouble: () => import('~/components/Icon/Arrows/IconArrowDouble'),
        GridAdvancedFiltersContainer: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersContainer'),
        GridAdvancedFilter: () => import('@Core/components/Grid/AdvancedFilters/GridAdvancedFilter'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
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
            iconExpanderState: ARROW.DOWN,
            isMouseOverFilters: false,
        };
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
        }),
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
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
        onExpandFilters() {
            this.isExpanded = !this.isExpanded;

            if (this.isExpanded) {
                this.iconExpanderState = ARROW.UP;
            } else {
                this.iconExpanderState = ARROW.DOWN;
            }
        },
        onRemoveAll() {
            this.setDisabledElements(
                this.filtersData
                    .map(({ element_id: elementId, language: languageCode }) => (
                        { languageCode, elementId, isDisabled: false }
                    )),
            );
            this.$cookies.remove(ADV_FILTERS_IDS);
            this.$store.dispatch(`${this.namespace}/removeAllAdvancedFilters`);
            this.onClearAll();
        },
        onClearAll() {
            this.$store.dispatch(`${this.namespace}/clearAllAdvancedFilters`);
            this.$store.dispatch(`${this.namespace}/getData`, this.path);
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
