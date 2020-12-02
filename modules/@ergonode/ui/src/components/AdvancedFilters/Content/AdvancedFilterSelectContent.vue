/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent :fixed="true">
        <AdvancedFilterShowOnly
            :value="value.isEmptyRecord"
            @input="onEmptyRecordChange" />
        <Divider />
        <SelectList
            v-if="options.length && !value.isEmptyRecord"
            :value="filterValue"
            :items="options"
            :size="smallSize"
            @input="onSelectValue">
            <template #item="{ item }">
                <ListElementDescription>
                    <ListElementTitle
                        :size="smallSize"
                        :hint="item.value ? `#${item.key} ${languageCode}` : ''"
                        :title="item.value || `#${item.key}`" />
                </ListElementDescription>
            </template>
        </SelectList>
        <DropdownPlaceholder v-else />
    </AdvancedFilterContent>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import Divider from '@UI/components/Dividers/Divider';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/Select/List/SelectList';

export default {
    name: 'AdvancedFilterSelectContent',
    components: {
        AdvancedFilterContent,
        DropdownPlaceholder,
        SelectList,
        ListElementDescription,
        ListElementTitle,
        AdvancedFilterShowOnly,
        Divider,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Object,
            default: () => ({
                isEmptyRecord: false,
            }),
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            required: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            if (!this.value[FILTER_OPERATOR.EQUAL]) {
                return {};
            }

            const value = this.value[FILTER_OPERATOR.EQUAL];
            const option = this.options.find(({
                id,
            }) => id === value);

            return {
                [JSON.stringify(option)]: option,
            };
        },
    },
    methods: {
        onSelectValue(value) {
            this.$emit('input', {
                value: value.key,
                key: FILTER_OPERATOR.EQUAL,
            });
        },
        onEmptyRecordChange(value) {
            this.$emit('input', {
                key: 'isEmptyRecord',
                value,
            });
        },
    },
};
</script>
