/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridEditNavigationCell @edit="onEditCell">
        <GridSelectEditContentCell :style="positionStyle">
            <TranslationSelect
                v-model="localValue"
                :autofocus="true"
                :size="smallSize"
                :clearable="true"
                :disabled="disabled"
                :multiselect="true"
                :options="mappedOptions"
                :error-messages="errorMessages"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import {
    getMappedMatchedArrayOptions,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export default {
    name: 'GridMultiSelectEditCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            localValue: getMappedMatchedArrayOptions({
                optionIds: this.value,
                options: this.options,
                languageCode: this.languageCode,
            }),
        };
    },
    computed: {
        languageCode() {
            const columnIdParts = this.columnId.split(':');

            if (columnIdParts.length < 1) {
                return '';
            }

            return columnIdParts[1];
        },
        smallSize() {
            return SIZE.SMALL;
        },
        mappedOptions() {
            return getMappedObjectOptions({
                options: this.options,
                languageCode: this.languageCode,
            });
        },
    },
    beforeDestroy() {
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
    },
    methods: {
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>
