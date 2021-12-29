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
                :multiselect="true"
                :wrap-value="true"
                :options="localOptions"
                option-key="id"
                option-value="value"
                @focus="onFocus"
                @search="onSearch" />
        </GridEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
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
import gridEditFilterCellMixin from '@UI/mixins/grid/gridEditFilterCellMixin';

export default {
    name: 'GridMultiSelectEditFilterCell',
    mixins: [
        gridEditFilterCellMixin,
    ],
    props: {
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
            default: 'EN',
        },
    },
    data() {
        const localValue = getMappedMatchedArrayOptions({
            optionIds: this.value[FILTER_OPERATOR.EQUAL] || [],
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
        const optionIds = this.localValue.map(option => option.id);

        const isEqual = arraysAreEqual(
            optionIds,
            this.value[FILTER_OPERATOR.EQUAL]
                ? this.value[FILTER_OPERATOR.EQUAL].map(option => option.id)
                : [],
        );

        if (!isEqual) {
            if (!this.localValue.length) {
                this.$emit('filter-clear', this.columnId);
            } else {
                this.$emit('filter-value', {
                    value: {
                        [FILTER_OPERATOR.EQUAL]: optionIds,
                    },
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                });
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
