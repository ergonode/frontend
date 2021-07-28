/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridCollectionDefaultCell
        :data="itemWithoutRemoveAction"
        object-fit="cover"
        @row-action="onRowAction" />
</template>

<script>
import {
    ROUTE_NAME,
} from '@Products/config/routes';

export default {
    name: 'ProductCollectionItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        itemWithoutRemoveAction() {
            const item = {
                ...this.item,
            };
            delete item.actions.delete;

            return item;
        },
    },
    methods: {
        onRowAction({
            key,
            value,
        }) {
            if (key === 'edit' || key === 'preview') {
                const lastIndex = value.length - 1;

                this.$router.push({
                    name: ROUTE_NAME.PRODUCT_EDIT_GENERAL,
                    params: {
                        id: value[lastIndex],
                    },
                });
            }
        },
    },
};
</script>
