/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :row="rowIndex"
        :column="columnIndex"
        :locked="isLocked"
        :copyable="false"
        :edit-key-code="32"
        :selected="isSelected"
        @edit="onValueChange">
        <GridBoolEditCell :value="localValue" />
    </GridTableCell>
</template>

<script>
import { mapState } from 'vuex';
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'GridAttachedDataCell',
    components: {
        GridTableCell,
        GridBoolEditCell,
    },
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
        rowIndex: {
            type: Number,
            required: true,
        },
        rowId: {
            type: [String, Number],
            required: true,
        },
        columnIndex: {
            type: Number,
            required: true,
        },
        isLocked: {
            type: Boolean,
            default: false,
        },
        isCopyable: {
            type: Boolean,
            default: false,
        },
        isSelected: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localValue: this.data.value,
        };
    },
    computed: {
        ...mapState('authentication', {
            languageCode: state => state.user.language,
        }),
        ...mapState('product', {
            id: state => state.id,
        }),
    },
    watch: {
        data() {
            this.localValue = this.data.value;
        },
    },
    methods: {
        onValueChange() {
            if (!this.localValue) {
                this.$axios.$post(`${this.languageCode}/products/${this.id}/children/add-from-skus`, { skus: [this.data.sku] }).then(() => {
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Products has been added' });
                    this.localValue = true;
                }).catch((e) => {
                    this.$addAlert({ type: ALERT_TYPE.ERROR, message: e.data });
                });
            } else {
                this.$axios.$delete(`${this.languageCode}/products/${this.id}/children/${this.rowId}`, { skus: this.data.sku }).then(() => {
                    this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Products has been removed' });
                    this.localValue = false;
                }).catch((e) => {
                    this.$addAlert({ type: ALERT_TYPE.ERROR, message: e.data });
                });
            }
        },
    },
};
</script>
