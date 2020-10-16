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
                :multiselect="true"
                :options="mappedOptions"
                @focus="onFocus" />
        </GridSelectEditContentCell>
    </GridEditNavigationCell>
</template>

<script>
import GridSelectEditContentCell from '@Core/components/Grid/Layout/Table/Cells/Edit/Content/GridSelectEditContentCell';
import TranslationSelect from '@Core/components/Select/TranslationSelect';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridEditFilterCellMixin from '@Core/mixins/grid/cell/gridEditFilterCellMixin';
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import {
    getMappedMatchedArrayOptions,
    getMappedObjectOptions,
} from '@Core/models/mappers/translationsMapper';

export default {
    name: 'GridMultiSelectEditFilterCell',
    components: {
        GridSelectEditContentCell,
        TranslationSelect,
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
        return {
            localValue: getMappedMatchedArrayOptions({
                optionIds: this.value[FILTER_OPERATOR.EQUAL] || [],
                options: this.options,
                languageCode: this.languageCode,
            }),
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
        const optionIds = this.localValue.map(option => option.id);

        const isEqual = arraysAreEqual(
            optionIds,
            this.value[FILTER_OPERATOR.EQUAL]
                ? this.value[FILTER_OPERATOR.EQUAL].map(option => option.id)
                : [],
        );

        if (!isEqual) {
            this.$emit('filter-value', {
                value: {
                    [FILTER_OPERATOR.EQUAL]: optionIds,
                },
                columnId: this.columnId,
                row: this.row,
                column: this.column,
            });
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
