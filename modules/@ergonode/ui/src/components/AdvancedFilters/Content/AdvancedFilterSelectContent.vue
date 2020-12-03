/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SelectList
        v-if="options.length && !value.isEmptyRecord"
        :value="filterValue"
        :items="options"
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
        <template #item="{ item }">
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
import AdvancedFilterShowOnly from '@UI/components/AdvancedFilters/AdvancedFilterShowOnly';
import Divider from '@UI/components/Dividers/Divider';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import SelectList from '@UI/components/Select/List/SelectList';

export default {
    name: 'AdvancedFilterSelectContent',
    components: {
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
    data() {
        return {
            localOptions: this.options,
            searchValue: '',
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            if (!this.value[FILTER_OPERATOR.EQUAL]) {
                return null;
            }

            const value = this.value[FILTER_OPERATOR.EQUAL];

            return this.options.find(({
                id,
            }) => id === value);
        },
    },
    methods: {
        onSearch(value) {
            this.searchValue = value;

            if (value) {
                const lowerCaseSearchValue = this.searchValue.toLowerCase();

                this.localOptions = this.options.filter((option) => {
                    if (option.value) {
                        return option.value.toLowerCase().includes(lowerCaseSearchValue);
                    }

                    return option.key.toLowerCase().includes(lowerCaseSearchValue);
                });
            } else {
                this.localOptions = this.options;
            }
        },
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
