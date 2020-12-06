/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SelectList
        :style="styles"
        :value="filterValue"
        :search-value="searchValue"
        :items="localOptions"
        :size="smallSize"
        :searchable="!value.isEmptyRecord"
        :multiselect="true"
        @input="onSelectValue"
        @search="onSearch">
        <template #prependHeader>
            <AdvancedFilterShowOnly
                :value="value.isEmptyRecord"
                @input="onEmptyRecordChange" />
            <Divider />
        </template>
        <template #body>
            <div v-if="value.isEmptyRecord" />
        </template>
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
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    simpleSearch,
} from '@Core/models/arrayWrapper';
import {
    DROPDOWN_MAX_HEIGHT,
} from '@UI/assets/scss/_js-variables/sizes.scss';
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Divider from '@UI/components/Dividers/Divider';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import SelectList from '@UI/components/SelectList/SelectList';

export default {
    name: 'AdvancedFilterMultiselectContent',
    components: {
        ListElementAction,
        ListElementDescription,
        ListElementTitle,
        SelectList,
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
    data() {
        return {
            localOptions: this.options,
            searchValue: '',
        };
    },
    computed: {
        styles() {
            return {
                maxHeight: DROPDOWN_MAX_HEIGHT,
            };
        },
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
        onSearch(value) {
            this.searchValue = value;

            this.localOptions = simpleSearch(
                this.options,
                value,
                [
                    'value',
                    'key',
                ],
                (searchValue, objectValue) => objectValue.includes(searchValue),
            );
        },
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
