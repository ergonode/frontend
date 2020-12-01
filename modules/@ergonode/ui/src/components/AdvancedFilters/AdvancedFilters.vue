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
            :value="value[filter.id]"
            :filter="filter"
            @remove="onRemove"
            @swap="onSwap"
            @apply="onApply" />
        <AdvancedFilterPlaceholder v-show="isPlaceholderVisible" />
        <AdvancedFiltersRemoveAllButton
            v-show="orderedFilters.length"
            @click.native="onRemoveAll" />
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
    },
    data() {
        return {
            orderedFilters: [],
            filterComponents: [],
        };
    },
    computed: {
        classes() {
            return 'advanced-filters';
        },
        isPlaceholderVisible() {
            return !this.orderedFilters.length;
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
        initializeFilters() {
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
                    () => import(`@UI/components/AdvancedFilters/Type/Grid${capitalisedType}TypeAdvancedFilter`),
                );
            }

            this.orderedFilters = orderedFilters;
            this.filterComponents = filterComponents;
        },
        onRemove(index) {
            const filter = this.orderedFilters[index];

            this.orderedFilters.splice(index, 1);
            this.filterComponents.splice(index, 1);

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
            this.filterComponents = [
                ...swapItemPosition(
                    this.filterComponents,
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
        flex-wrap: wrap;
        padding: 8px 6px 0 8px;

        & > * {
            margin: 8px 0 0 8px;
        }
    }
</style>
