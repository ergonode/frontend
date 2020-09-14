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
            <GridAdvancedFilterSelectContent
                :value="localValue"
                :options="filter.options"
                :language-code="filter.languageCode"
                @input="onValueChange" />
        </template>
        <template #footer="{ onApply }">
            <SelectDropdownFooter
                @apply="onApply"
                @clear="onClear" />
        </template>
    </GridAdvancedFilter>
</template>

<script>
import GridAdvancedFilterSelectContent from '@Core/components/Grid/AdvancedFilters/Content/GridAdvancedFilterTextContent';
import GridAdvancedFilter from '@Core/components/Grid/AdvancedFilters/GridAdvancedFilter';
import SelectDropdownFooter from '@Core/components/Inputs/Select/DropDown/Footers/SelectDropdownFooter';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';

export default {
    name: 'GridSelectTypeAdvancedFilter',
    components: {
        GridAdvancedFilter,
        GridAdvancedFilterSelectContent,
        SelectDropdownFooter,
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
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
                [FILTER_OPERATOR.EQUAL]: '',
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

            const option = this.filter.options
                .find(opt => opt.id === this.localValue[FILTER_OPERATOR.EQUAL]);

            if (!option) return '';

            return option.value || `#${option.key}`;
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
                [FILTER_OPERATOR.EQUAL]: '',
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
