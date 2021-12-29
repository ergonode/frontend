/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="classes">
        <Component
            v-for="(filter, index) in orderedFilters"
            :is="filterComponents[filter.type]"
            :key="filter.id"
            :scope="scope"
            :index="index"
            :value="value[filter.id]"
            :filter="filter"
            :draggable="draggable"
            @remove="onRemove"
            @swap="onSwap"
            @apply="onApply" />
        <AdvancedFilterPlaceholder v-show="isPlaceholderVisible" />
        <slot
            name="removeAllButton"
            :visible="orderedFilters.length">
            <AdvancedFiltersRemoveAllButton
                v-show="orderedFilters.length"
                @click.native="onRemoveAll" />
        </slot>
    </div>
</template>

<script>
import {
    swapItemPosition,
} from '@Core/models/arrayWrapper';
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import AdvancedFilterPlaceholder from '@UI/components/AdvancedFilters/AdvancedFilterPlaceholder';
import AdvancedFiltersRemoveAllButton from '@UI/components/AdvancedFilters/AdvancedFiltersRemoveAllButton';

export default {
    name: 'AdvancedFilters',
    components: {
        AdvancedFilterPlaceholder,
        AdvancedFiltersRemoveAllButton,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
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
        value: {
            type: Object,
            default: () => ({}),
        },
        /**
         * The data model of extended filter components
         */
        extendedFilters: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Determines state of draggable attribute
         */
        draggable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            filterTypes: {},
            orderedFilters: [],
            filterComponents: {},
        };
    },
    computed: {
        classes() {
            return 'advanced-filters';
        },
        isPlaceholderVisible() {
            return !this.orderedFilters.length && this.draggable;
        },
    },
    watch: {
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
        async initializeFilters() {
            const orderedFilters = [];
            const requests = [];
            const {
                length,
            } = this.filters;

            for (let i = 0; i < length; i += 1) {
                const {
                    type,
                } = this.filters[i];

                orderedFilters.push(this.filters[i]);

                if (typeof this.filterTypes[type] === 'undefined') {
                    this.filterTypes[type] = capitalizeAndConcatenationArray(type.split('_'));

                    if (this.extendedFilters[type]) {
                        this.setExtendedFilter(type);
                    } else {
                        requests.push(this.setFilter(type));
                    }
                }
            }

            await Promise.all(requests);

            this.orderedFilters = orderedFilters;
        },
        setExtendedFilter(type) {
            this.filterComponents[type] = this.extendedFilters[type];
        },
        setFilter(type) {
            return import(`@UI/components/AdvancedFilters/Type/AdvancedFilter${this.filterTypes[type]}Type`)
                .then((response) => {
                    this.filterComponents[type] = response.default;
                })
                .catch(() => import('@UI/components/AdvancedFilters/Type/AdvancedFilterTextType')
                    .then((response) => {
                        this.filterComponents[type] = response.default;
                    }));
        },
        onRemove(index) {
            const filter = this.orderedFilters[index];

            this.orderedFilters.splice(index, 1);

            this.$emit('remove', {
                index,
                filter,
            });
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

            this.$emit('swap', {
                from,
                to,
            });
        },
        onApply({
            key,
            value,
        }) {
            this.$emit('input', {
                ...this.value,
                [key]: value,
            });
        },
        onRemoveAll() {
            this.$emit('remove-all');
        },
    },
};
</script>

<style lang="scss" scoped>
    .advanced-filters {
        display: flex;
        flex-flow: wrap;

        & > * {
            margin: 12px 12px 0 0;
        }
    }
</style>
