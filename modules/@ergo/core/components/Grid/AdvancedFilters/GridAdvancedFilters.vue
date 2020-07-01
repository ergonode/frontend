/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <Component
            v-for="(filter, index) in orderedFilters"
            :is="filterComponents[index]"
            :key="filter.id"
            :index="index"
            :filter="filter"
            @remove="onRemove"
            @swap="onSwap"
            @apply="onApply" />
        <GridAdvancedFilterPlaceholder v-if="isPlaceholderVisible" />
        <GridAdvancedFiltersRemoveAllButton
            v-show="orderedFilters.length"
            @click.native="onRemoveAll" />
    </div>
</template>

<script>
import GridAdvancedFilterPlaceholder from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilterPlaceholder';
import GridAdvancedFiltersRemoveAllButton from '@Core/components/Grid/AdvancedFilters/GridAdvancedFiltersRemoveAllButton';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import {
    changeCookiePosition,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridAdvancedFilters',
    components: {
        GridAdvancedFilterPlaceholder,
        GridAdvancedFiltersRemoveAllButton,
    },
    props: {
        filters: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            orderedFilters: [],
            filterComponents: [],
            filterValues: {},
        };
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
            draggedElement: state => state.draggedElement,
        }),
        classes() {
            return 'grid-advanced-filters';
        },
        isListElementDragging() {
            return this.isElementDragging === DRAGGED_ELEMENT.LIST;
        },
        isPlaceholderVisible() {
            return !this.orderedFilters.length && !this.isListElementDragging;
        },
    },
    watch: {
        draggedElement() {
            const draggedElIndex = this.orderedFilters.findIndex(
                filter => filter.id === this.draggedElement,
            );

            this.$emit('exists', draggedElIndex !== -1);
        },
        filters: {
            immediate: true,
            handler() {
                if (this.orderedFilters.length !== this.filters.length) {
                    this.initializeFilters();
                }
            },
        },
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElement',
        ]),
        initializeFilters() {
            const config = this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

            if (!config) {
                this.$cookies.set(
                    `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                    this.filters
                        .map(({
                            id,
                        }) => id)
                        .join(','),
                );
            }

            const orderedFilters = [];
            const filterComponents = [];
            const {
                length,
            } = this.filters;

            for (let i = 0; i < length; i += 1) {
                const type = capitalizeAndConcatenationArray(this.filters[i].type.split('_'));

                orderedFilters.push(this.filters[i]);
                filterComponents.push(
                    () => import(`@Core/components/Grid/AdvancedFilters/Grid${type}AdvancedFilter`),
                );
            }

            this.orderedFilters = orderedFilters;
            this.filterComponents = filterComponents;

            this.$emit('count', this.orderedFilters.length);
        },
        onRemove(index) {
            const filter = this.orderedFilters[index];

            this.orderedFilters.splice(index, 1);
            this.filterComponents.splice(index, 1);

            removeCookieAtIndex({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                index,
            });

            this.setDisabledElement({
                languageCode: filter.languageCode,
                elementId: filter.attributeId,
                disabled: false,
            });

            delete this.filterValues[filter.id];

            this.$emit('count', this.orderedFilters.length);
            this.$emit('filter', this.filterValues);
        },
        onSwap({
            from, to,
        }) {
            this.orderedFilters = [
                ...swapItemPosition(
                    this.orderedFilters,
                    from,
                    to,
                ),
            ];
            this.filterComponents = [
                ...swapItemPosition(
                    this.filterComponents,
                    from,
                    to,
                ),
            ];
            changeCookiePosition({
                cookies: this.$cookies,
                cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                from,
                to,
            });
        },
        onApply({
            key, value,
        }) {
            if (this.filterValues[key] !== value || value === 0) {
                this.filterValues[key] = value;

                this.$emit('filter', this.filterValues);
            }
        },
        onRemoveAll() {
            this.orderedFilters.forEach(({
                attributeId, languageCode,
            }) => {
                this.setDisabledElement({
                    languageCode,
                    elementId: attributeId,
                    disabled: false,
                });
            });

            this.orderedFilters = [];
            this.filterComponents = [];
            this.filterValues = {};

            this.$cookies.remove(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

            this.$emit('count', this.orderedFilters.length);
            this.$emit('filter', this.filterValues);
        },
    },
};
</script>

<style lang="scss" scoped>
    .grid-advanced-filters {
        display: flex;
        flex-wrap: wrap;
        padding: 8px 6px 0 8px;

        & > * {
            margin: 8px 0 0 8px;
        }

        &--disabled {

        }
    }
</style>
