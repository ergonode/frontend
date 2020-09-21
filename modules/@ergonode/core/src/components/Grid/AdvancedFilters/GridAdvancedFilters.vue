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
            :value="filterValues[filter.id]"
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
        filterValues: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            orderedFilters: [],
            filterComponents: [],
        };
    },
    computed: {
        ...mapState('list', [
            'disabledElements',
        ]),
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
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
            'removeDisabledElement',
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
                const {
                    type,
                } = this.filters[i];
                const capitalisedType = capitalizeAndConcatenationArray(type.split('_'));

                orderedFilters.push(this.filters[i]);
                filterComponents.push(
                    () => import(`@Core/components/Grid/AdvancedFilters/Type/Grid${capitalisedType}TypeAdvancedFilter`),
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

            this.disableListElement({
                languageCode: filter.languageCode,
                attributeId: filter.attributeId,
            });

            const filterValues = {
                ...this.filterValues,
            };
            delete filterValues[filter.id];

            this.$emit('count', this.orderedFilters.length);
            this.$emit('filter', filterValues);
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
            this.$emit('filter', {
                ...this.filterValues,
                [key]: value,
            });
        },
        onRemoveAll() {
            this.orderedFilters.forEach(({
                attributeId, languageCode,
            }) => {
                this.disableListElement({
                    languageCode,
                    attributeId,
                });
            });

            this.orderedFilters = [];
            this.filterComponents = [];

            this.$cookies.remove(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

            this.$emit('count', this.orderedFilters.length);
            this.$emit('filter', {});
        },
        disableListElement({
            languageCode, attributeId,
        }) {
            if (this.disabledElements[languageCode][attributeId]) {
                this.setDisabledElement({
                    languageCode,
                    elementId: attributeId,
                    disabled: false,
                });
            } else {
                this.removeDisabledElement({
                    languageCode,
                    elementId: attributeId,
                });
            }
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
    }
</style>
