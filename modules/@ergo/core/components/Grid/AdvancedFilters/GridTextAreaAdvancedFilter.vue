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
            <GridAdvancedFilterTextContent
                :value="value"
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
import GridAdvancedFilterTextContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterTextContent';
import GridAdvancedFilter from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilter';
import SelectDropdownApplyFooter from '@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownApplyFooter';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    getParsedFilter,
} from '@Core/models/mappers/gridDataMapper';

export default {
    name: 'GridTextAreaAdvancedFilter',
    components: {
        GridAdvancedFilter,
        GridAdvancedFilterTextContent,
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
                [FILTER_OPERATOR.EQUAL]: '',
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

            return this.value[FILTER_OPERATOR.EQUAL];
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
                [FILTER_OPERATOR.EQUAL]: '',
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
