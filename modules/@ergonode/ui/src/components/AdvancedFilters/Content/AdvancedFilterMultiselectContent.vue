/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilterContent>
        <AdvancedFilterShowOnly
            :value="value.isEmptyRecord"
            @input="onEmptyRecordChange" />
        <Divider />
        <SelectList
            v-if="options.length && !value.isEmptyRecord"
            :value="filterValue"
            :items="options"
            :size="smallSize"
            :multiselect="true"
            @input="onSelectValue">
            <template #item="{ item, isSelected }">
                <ListElementAction :size="smallSize">
                    <CheckBox :value="isSelected" />
                </ListElementAction>
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
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Divider from '@UI/components/Dividers/Divider';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/Select/List/SelectList';

export default {
    name: 'AdvancedFilterMultiselectContent',
    components: {
        AdvancedFilterContent,
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        SelectList,
        DropdownPlaceholder,
        CheckBox,
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
            if (!this.value[FILTER_OPERATOR.EQUAL]
                || this.value[FILTER_OPERATOR.EQUAL].length === 0) {
                return [];
            }

            const value = this.value[FILTER_OPERATOR.EQUAL];
            const filterValue = [];

            for (let i = 0; i < value.length; i += 1) {
                const option = this.options
                    .find(({
                        id,
                    }) => id === value[i]);

                filterValue.push(option);
            }

            return filterValue;
        },
    },
    methods: {
        onSelectValue(value) {
            this.$emit('input', {
                key: FILTER_OPERATOR.EQUAL,
                value: value.map(({
                    id,
                }) => id),
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
