/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="check-cell">
        <CheckBox v-model="selectionState" />
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
        isSelected: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    watch: {
        isSelected() {
            this.setSelectedRow({ row: this.row, value: !this.selectionState });
        },
    },
    computed: {
        ...mapState('grid', {
            isSelectedAllRows: state => state.isSelectedAllRows,
            selectedRows: state => state.selectedRows,
        }),
        selectionState: {
            get() {
                return this.selectedRows[this.row] || this.isSelectedAllRows;
            },
            set(value) {
                this.setSelectedRow({ row: this.row, value });
            },
        },
    },
    methods: {
        ...mapActions('grid', [
            'setSelectedRow',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .check-cell {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
</style>
