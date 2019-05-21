/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="header-cell">
        <CheckBox v-model="selectionState" />
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'GridActionHeaderCell',
    components: {
        CheckBox: () => import('~/components/Inputs/CheckBox'),
    },
    props: {
        isSelected: {
            type: Boolean,
            required: true,
        },
    },
    watch: {
        isSelected() {
            this.setSelectionForAllRows({ isSelected: !this.selectionState });
        },
    },
    computed: {
        ...mapState('grid', {
            isSelectedAllRows: state => state.isSelectedAllRows,
            selectedRows: state => state.selectedRows,
        }),
        rowsAreSelected() {
            return Boolean(Object.entries(this.selectedRows).length);
        },
        selectionState: {
            get() {
                if (!this.rowsAreSelected) {
                    return +this.isSelectedAllRows;
                }

                return this.rowsAreSelected ? 2 : 0;
            },
            set(value) {
                this.setSelectionForAllRows({ isSelected: Boolean(value) });
            },
        },
    },
    methods: {
        ...mapActions('grid', [
            'setSelectionForAllRows',
        ]),
    },
};
</script>

<style lang="scss" scoped>
    .header-cell {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        padding: 8px;
    }
</style>
