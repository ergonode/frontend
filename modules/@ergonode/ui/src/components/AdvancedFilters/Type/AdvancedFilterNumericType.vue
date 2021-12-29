/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilter
        :scope="scope"
        :index="index"
        :value="filterValue"
        :hint="hint"
        :title="title"
        :parameters="parameters"
        :filter-id="filter.id"
        @remove="onRemove"
        @swap="onSwap"
        @apply="onApplyValue">
        <template #dropdown="{ onApply }">
            <AdvancedFilterRangeContent
                :value="localValue"
                @input="onValueChange" />
            <MultiselectDropdownFooter
                @apply="onApply"
                @clear="onClear" />
        </template>
    </AdvancedFilter>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import AdvancedFilter from '@UI/components/AdvancedFilters/AdvancedFilter';
import AdvancedFilterRangeContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterRangeContent';

export default {
    name: 'AdvancedFilterNumericType',
    components: {
        AdvancedFilter,
        AdvancedFilterRangeContent,
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
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: '',
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: '',
            }),
        },
    },
    data() {
        return {
            localValue: {},
        };
    },
    computed: {
        parameters() {
            if (!this.filter.parameters) return '';

            return Object.values(this.filter.parameters).join(', ');
        },
        title() {
            const [
                code,
            ] = this.filter.id.split(':');

            return this.filter.label || `#${code}`;
        },
        hint() {
            const [
                code,
                languageCode,
            ] = this.filter.id.split(':');

            return this.filter.label ? `${code} ${languageCode}` : null;
        },
        filterValue() {
            if (this.localValue.isEmptyRecord) return 'Empty records';

            return [
                this.localValue[FILTER_OPERATOR.GREATER_OR_EQUAL],
                this.localValue[FILTER_OPERATOR.SMALLER_OR_EQUAL],
            ].filter(value => value !== '' && value !== null && typeof value !== 'undefined')
                .join(' - ');
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                this.localValue = {
                    ...this.value,
                };
            },
        },
    },
    methods: {
        onValueChange({
            key, value,
        }) {
            this.localValue[key] = value;
        },
        onRemove(index) {
            this.$emit('remove', index);
        },
        onSwap(payload) {
            this.$emit('swap', payload);
        },
        onClear() {
            this.localValue = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: '',
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: '',
            };
        },
        onApplyValue() {
            if (JSON.stringify(this.value) !== JSON.stringify(this.localValue)) {
                this.$emit('apply', {
                    key: this.filter.id,
                    value: this.localValue,
                });
            }
        },
    },
};
</script>
