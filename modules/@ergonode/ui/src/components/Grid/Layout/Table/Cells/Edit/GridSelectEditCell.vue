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
                :size="smallSize"
                :searchable="true"
                :clearable="true"
                :wrap-value="true"
                :disabled="disabled"
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
    simpleSearch,
} from '@Core/models/arrayWrapper';
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import gridEditCellMixin from '@UI/mixins/grid/gridEditCellMixin';

export default {
    name: 'GridSelectEditCell',
    mixins: [
        gridEditCellMixin,
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
            required: true,
        },
    },
    data() {
        let localValue = null;

        if (this.value) {
            localValue = getMappedObjectOption({
                option: {
                    id: this.value,
                    ...this.options[this.value],
                },
                languageCode: this.languageCode,
            });
        }

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
        if (!this.disabled && ((this.localValue && this.localValue.id !== this.value)
            || (!this.localValue && this.value))) {
            this.$emit('cell-value', [
                {
                    value: this.localValue.id || this.localValue,
                    rowId: this.rowId,
                    columnId: this.columnId,
                    row: this.row,
                    column: this.column,
                },
            ]);
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
