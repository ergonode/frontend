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
import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridCheckCell',
    components: {
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    props: {
        row: {
            type: Number,
            required: true,
        },
        isHeader: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        ...mapState('grid', {
            isSelectedAllRows: state => state.isSelectedAllRows,
            selectedRows: state => state.selectedRows,
        }),
        selectionState() {
            if (this.isHeader) {
                const rowsAreSelected = Boolean(Object.entries(this.selectedRows).length);

                if (!rowsAreSelected) {
                    return +this.isSelectedAllRows;
                }

                return rowsAreSelected ? 2 : 0;
            }
            return this.selectedRows[this.row] || this.isSelectedAllRows;
        },
    },
    methods: {
        ...mapActions('grid', [
            'setSelectedRow',
            'setSelectionForAllRows',
            'setEditingCellCoordinates',
        ]),
        onSelect(value) {
            if (this.isHeader) {
                this.setSelectionForAllRows({ isSelected: Boolean(value) });
            } else {
                this.setSelectedRow({ row: this.row, value });
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
