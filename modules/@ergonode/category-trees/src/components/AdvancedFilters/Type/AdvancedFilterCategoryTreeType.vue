/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilter
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
            <AdvancedFilterContent :fixed="true">
                <div>DUPA</div>
            </AdvancedFilterContent>
            <!--            <AdvancedFilterSelectContent-->
            <!--                :value="localValue"-->
            <!--                :options="filter.options"-->
            <!--                :language-code="filter.languageCode"-->
            <!--                @input="onValueChange" />-->
        </template>
        <template #footer="{ onApply }">
            <SelectDropdownFooter
                @apply="onApply"
                @clear="onClear" />
        </template>
    </AdvancedFilter>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    ROUTE_NAME,
} from '@Trees/config/routes';
import AdvancedFilter from '@UI/components/AdvancedFilters/AdvancedFilter';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import SelectDropdownFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownFooter';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';

export default {
    name: 'AdvancedFilterCategoryTreeType',
    components: {
        AdvancedFilter,
        AdvancedFilterContent,
        SelectDropdownFooter,
        Autocomplete,
        DropdownPlaceholder,
    },
    props: {
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        placeholder() {
            return {
                title: 'No category tree',
                subtitle: 'There are no category trees in the system, so you can create the first one.',
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
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
            return '';
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
        onNavigateToCategoryTrees() {
            this.$router.push({
                name: ROUTE_NAME.CATEGORY_TREES_GRID,
            });
        },
        onValueChange(value) {
            // this.localValue[key] = value;
            console.log(value);
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
