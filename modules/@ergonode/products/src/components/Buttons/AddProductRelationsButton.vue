/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Products._.submit')"
        :size="smallSize"
        @click.native="onAddRelations" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';

export default {
    name: 'AddProductRelationsButton',
    components: {
        Button,
    },
    props: {
        selectedRows: {
            type: Object,
            default: () => ({}),
        },
        excludedFromSelectionRows: {
            type: Object,
            default: () => ({}),
        },
        selectedRowsCount: {
            type: Number,
            default: 0,
        },
        onClearSelectedRows: {
            type: Function,
            default: () => {},
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onAddRelations() {
            // TODO: Get products by filter, based on output present user message

            if (true) {
                this.$addAlert({
                    type: ALERT_TYPE.SUCCESS,
                    message: this.$t('@Products.product.components.AddProductRelationsGrid.successUpdateMessage'),
                });
            } else {
                this.$addAlert({
                    type: ALERT_TYPE.INFO,
                    message: this.$t('@Products.product.components.AddProductRelationsGrid.infoMessage'),
                });
            }
        },
    },
};
</script>
