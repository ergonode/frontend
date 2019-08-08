/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-cell">
        <CheckBox
            :value="selectionState"
            @input="onSelect" />
    </div>
</template>

<script>

export default {
    name: 'GridCheckCell',
    components: {
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    props: {
        storeNamespace: {
            type: String,
            required: true,
        },
        row: {
            type: Number,
            required: true,
        },
        isHeader: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        gridState() {
            return this.$store.state[this.storeNamespace];
        },
        selectionState() {
            if (this.isHeader) {
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
        onSelect(value) {
            if (this.isHeader) {
                this.$store.dispatch(`${this.storeNamespace}/setSelectionForAllRows`, { isSelected: Boolean(value) });
            } else {
                this.$store.dispatch(`${this.storeNamespace}/setSelectedRow`, { row: this.row, value });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .check-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        margin: 8px;
    }
</style>
