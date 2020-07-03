/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridAdvancedFilter
        :index="index"
        :value="filterValue"
        :hint="hint"
        :title="title"
        :parameters="parameters"
        :filter-id="filter.id"
        @remove="onRemove"
        @swap="onSwap"
        @apply="onApplyValue">
        <template #body>
            <GridAdvancedFilterDateContent
                :value="value"
                :format="parameters"
                @input="onValueChange" />
        </template>
        <template #footer="{ onApply }">
            <SelectDropdownApplyFooter
                @apply="onApply"
                @clear="onClear" />
        </template>
    </GridAdvancedFilter>
</template>

<script>
import GridAdvancedFilterDateContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterDateContent';
import GridAdvancedFilter from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilter';
import SelectDropdownApplyFooter from '@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownApplyFooter';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    getParsedFilter,
} from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridDateTypeAdvancedFilter',
    components: {
        GridAdvancedFilter,
        GridAdvancedFilterDateContent,
        SelectDropdownApplyFooter,
    },
    props: {
        index: {
            type: Number,
            required: true,
        },
        filter: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            value: {
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: '',
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: '',
            },
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
            if (this.value.isEmptyRecord) return 'Empty records';

            return [
                this.value[FILTER_OPERATOR.GREATER_OR_EQUAL],
                this.value[FILTER_OPERATOR.SMALLER_OR_EQUAL],
            ].filter(value => value !== '')
                .join(' - ');
        },
    },
    methods: {
        onValueChange({
            key, value,
        }) {
            this.value[key] = value;
        },
        onRemove(index) {
            this.$emit('remove', index);
        },
        onSwap(payload) {
            this.$emit('swap', payload);
        },
        onClear() {
            this.value = {
                isEmptyRecord: false,
                [FILTER_OPERATOR.GREATER_OR_EQUAL]: '',
                [FILTER_OPERATOR.SMALLER_OR_EQUAL]: '',
            };
        },
        onApplyValue() {
            this.$emit('apply', {
                key: this.filter.id,
                value: getParsedFilter({
                    id: this.filter.id,
                    filter: this.value,
                }),
            });
        },
    },
};
</script>
