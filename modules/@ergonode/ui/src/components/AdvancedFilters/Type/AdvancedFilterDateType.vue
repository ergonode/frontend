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
        :filter-id="filter.id"
        @remove="onRemove"
        @swap="onSwap"
        @apply="onApplyValue">
        <template #dropdown="{ onApply }">
            <AdvancedFilterDateContent
                :value="localValue"
                :format="parameters"
                @input="onValueChange" />
            <SelectDropdownApplyFooter
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
import AdvancedFilterDateContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterDateContent';
import SelectDropdownApplyFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownApplyFooter';
import {
    DEFAULT_FORMAT,
} from '@UI/models/calendar';
import {
    format as formatDate,
    parse as parseDate,
} from 'date-fns';

export default {
    name: 'AdvancedFilterDateType',
    components: {
        AdvancedFilter,
        AdvancedFilterDateContent,
        SelectDropdownApplyFooter,
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
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: null,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: null,
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
            ].filter(value => value)
                .map(value => formatDate(value, this.parameters))
                .join(' - ');
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                const fromDate = this.value[FILTER_OPERATOR.GREATER_OR_EQUAL]
                    ? parseDate(
                        this.value[FILTER_OPERATOR.GREATER_OR_EQUAL],
                        DEFAULT_FORMAT,
                        new Date(),
                    )
                    : null;
                const toDate = this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL]
                    ? parseDate(
                        this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL],
                        DEFAULT_FORMAT,
                        new Date(),
                    )
                    : null;

                this.localValue = {
                    ...this.value,
                    [FILTER_OPERATOR.GREATER_OR_EQUAL]: fromDate,
                    [FILTER_OPERATOR.SMALLER_OR_EQUAL]: toDate,
                };
            },
        },
    },
    methods: {
        onValueChange({
            key,
            value,
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
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: null,
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: null,
            };
        },
        onApplyValue() {
            const filterValue = {
                ...this.localValue,
            };

            if (filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL]) {
                const fromValue = formatDate(
                    filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL],
                    DEFAULT_FORMAT,
                );

                filterValue[FILTER_OPERATOR.GREATER_OR_EQUAL] = fromValue;
            }

            if (filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL]) {
                const toValue = formatDate(
                    filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL],
                    DEFAULT_FORMAT,
                );

                filterValue[FILTER_OPERATOR.SMALLER_OR_EQUAL] = toValue;
            }

            if (JSON.stringify(this.value) !== JSON.stringify(this.localValue)) {
                this.$emit('apply', {
                    key: this.filter.id,
                    value: filterValue,
                });
            }
        },
    },
};
</script>
