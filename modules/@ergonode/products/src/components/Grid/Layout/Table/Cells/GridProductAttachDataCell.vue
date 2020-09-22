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
        @mousedown.native="onValueChange">
        <GridBoolEditCell :value="localValue" />
    </GridTableCell>
</template>

<script>
import GridBoolEditCell from '@Core/components/Grid/Layout/Table/Cells/Edit/GridBoolEditCell';
import GridTableCell from '@Core/components/Grid/Layout/Table/Cells/GridTableCell';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'GridProductAttachDataCell',
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
            type: [
                String,
                Number,
            ],
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
        ...mapState('product', [
            'id',
        ]),
    },
    watch: {
        data() {
            this.localValue = this.data.value;
        },
    },
    methods: {
        ...mapActions('product', [
            'addBySku',
            'removeProductChildren',
        ]),
        onValueChange() {
            if (this.isLocked) {
                return;
            }

            if (!this.localValue) {
                this.addBySku({
                    skus: this.data.sku,
                }).then(() => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Products have been added',
                    });
                    this.localValue = true;
                }).catch((e) => {
                    this.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: e.data,
                    });
                });
            } else {
                this.removeProductChildren({
                    childrenId: this.rowId,
                    skus: this.data.sku,
                }).then(() => {
                    this.$addAlert({
                        type: ALERT_TYPE.SUCCESS,
                        message: 'Products have been removed',
                    });
                    this.localValue = false;
                }).catch((e) => {
                    this.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: e.data,
                    });
                });
            }
        },
    },
};
</script>
