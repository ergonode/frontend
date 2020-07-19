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
                :options="mappedOptions"
                :error-messages="errorMessages"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import TranslationSelect from '@Core/components/Inputs/Select/TranslationSelect';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditCellMixin from '@Core/mixins/grid/cell/gridEditCellMixin';
import {
    getMappedObjectOption,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export default {
    name: 'GridSelectEditCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
    },
    mixins: [
        gridEditCellMixin,
    ],
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
        languageCode: {
            type: String,
            default: 'EN',
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

        return {
            localValue,
        };
    },
    computed: {
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
        if (this.localValue && this.localValue.id !== this.value) {
            this.$emit('cellValue', [
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
        onFocus(isFocused) {
            if (!isFocused) {
                this.onEditCell();
            }
        },
    },
};
</script>
