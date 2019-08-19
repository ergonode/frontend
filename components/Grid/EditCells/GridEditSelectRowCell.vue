/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCheckCell
        :value="selectionState"
        :row="row"
        :store-namespace="storeNamespace"
        :disabled="false"
        @input="onCheck" />
</template>

<script>
import GridCheckCell from '~/components/Grid/GridCheckCell';

export default {
    name: 'GridEditSelectRowCell',
    components: {
        GridCheckCell,
    },
    props: {
        row: {
            type: Number,
            required: true,
        },
        storeNamespace: {
            type: String,
            required: true,
        },
        multicheck: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        selectionState() {
            if (this.multicheck) {
                const rowsAreSelected = Boolean(Object.entries(this.gridState.selectedRows).length);

                if (!rowsAreSelected) {
                    return +this.gridState.isSelectedAllRows;
                }

                return 2;
            }
            return this.gridState.selectedRows[this.row] || this.gridState.isSelectedAllRows;
        },
    },
    methods: {
        onCheck(value) {
            if (this.multicheck) this.$store.dispatch(`${this.storeNamespace}/setSelectionForAllRows`, { isSelected: Boolean(value) });
            else this.$store.dispatch(`${this.storeNamespace}/setSelectedRow`, { row: this.row, value });
        },
    },
};
</script>
