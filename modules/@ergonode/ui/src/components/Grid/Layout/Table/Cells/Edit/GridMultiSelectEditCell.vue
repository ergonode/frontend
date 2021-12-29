/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridEditContentCell :bounds="bounds">
            <Select
                v-model="localValue"
                :search-value="searchValue"
                :autofocus="true"
                :searchable="true"
                :size="smallSize"
                :clearable="true"
                :disabled="disabled"
                :multiselect="true"
                :wrap-value="true"
                :options="localOptions"
                :error-messages="errorMessages"
                option-key="id"
                option-value="value"
                @focus="onFocus"
                @search="onSearch" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    arraysAreEqual,
    simpleSearch,
} from '@Core/models/arrayWrapper';
import {
    getMappedMatchedArrayOptions,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridMultiSelectEditCell',
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        /**
         * Component value
         */
        value: {
            type: Array,
            default: () => [],
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Code of the language
         */
        languageCode: {
            type: String,
            required: true,
        },
    },
    data() {
        const localValue = getMappedMatchedArrayOptions({
            optionIds: this.value,
            options: this.options,
            languageCode: this.languageCode,
        });
        const localOptions = getMappedObjectOptions({
            options: this.options,
            languageCode: this.languageCode,
        });

        return {
            localValue,
            localOptions,
            allOptions: localOptions,
            searchValue: '',
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    beforeDestroy() {
        if (!this.disabled) {
            const optionIds = this.localValue.map(option => option.id);

            if (!arraysAreEqual(optionIds, this.value.map(option => option.id))) {
                this.$emit('cell-value', [
                    {
                        value: optionIds,
                        rowId: this.rowId,
                        columnId: this.columnId,
                        row: this.row,
                        column: this.column,
                    },
                ]);
            }
        }
    },
    methods: {
        onSearch(value) {
            this.searchValue = value;

            this.localOptions = simpleSearch(
                this.allOptions,
                value,
                [
                    'value',
                    'key',
                ],
            );
        },
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>
