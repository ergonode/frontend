/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <Select
                v-model="localValue"
                :search-value="searchValue"
                :autofocus="true"
                :searchable="true"
                :size="smallSize"
                :clearable="true"
                :options="localOptions"
                option-key="key"
                option-value="value"
                @focus="onFocus"
                @search="onSearch" />
        </GridSelectEditContentCell>
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
    simpleSearch,
} from '@Core/models/arrayWrapper';
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';
import GridSelectEditContentCell from '@UI/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import gridEditFilterCellMixin from '@UI/mixins/grid/gridEditFilterCellMixin';

export default {
    name: 'GridSelectEditFilterCell',
    components: {
        GridSelectEditContentCell,
    },
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
        let localValue = null;

        if (typeof this.value[FILTER_OPERATOR.EQUAL] !== 'undefined') {
            const option = {
                id: this.value[FILTER_OPERATOR.EQUAL],
                ...this.options[this.value[FILTER_OPERATOR.EQUAL]],
            };

            localValue = getMappedObjectOption({
                option,
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
        if ((this.localValue && this.localValue.id !== this.value[FILTER_OPERATOR.EQUAL])
            || (!this.localValue && this.value[FILTER_OPERATOR.EQUAL])) {
            if (!this.localValue) {
                this.$emit('filter-clear', this.columnId);
            } else {
                this.$emit('filter-value', {
                    value: {
                        [FILTER_OPERATOR.EQUAL]: this.localValue.id || this.localValue,
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
