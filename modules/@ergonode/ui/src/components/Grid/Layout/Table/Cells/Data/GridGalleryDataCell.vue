/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :draft="cellData.isDraft"
        :error="Boolean(errorMessages)"
        :disabled="isDisabled"
        :copyable="isCopyable"
        :selected="isSelected"
        @edit="onEditCell">
        <template v-if="cellData.value.length">
            <GridImagePresentationCell
                :value="cellData.value[0]"
                :suffix="data.suffix" />
            <GridSuffixPresentationCell
                v-if="data.suffix"
                :suffix="data.suffix" />
        </template>
    </GridTableCell>
</template>

<script>
import {
    arraysAreEqual,
} from '@Core/models/arrayWrapper';
import gridDataCellMixin from '@UI/mixins/grid/gridDataCellMixin';

export default {
    name: 'GridGalleryDataCell',
    mixins: [
        gridDataCellMixin,
    ],
    computed: {
        cellData() {
            if (this.isDraft && !arraysAreEqual(this.data.value, this.draft)) {
                return {
                    value: this.draft,
                    isDraft: true,
                };
            }

            return {
                value: this.data.value,
                isDraft: false,
            };
        },
    },
};
</script>
