/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SelectList
        :items-max-height="itemsMaxHeight"
        :value="filterValue"
        :items="options"
        :size="smallSize"
        :searchable="!value.isEmptyRecord"
        :multiselect="true"
        option-key="key"
        option-value="value"
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

export default {
    name: 'AdvancedFilterSelectContent',
    components: {
        AdvancedFilterShowOnly,
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
        itemsMaxHeight() {
            return DROPDOWN_MAX_HEIGHT;
        },
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

            this.localOptions = simpleSearch(
                this.options,
                value,
                [
                    'label',
                    'code',
                ],
            );
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
