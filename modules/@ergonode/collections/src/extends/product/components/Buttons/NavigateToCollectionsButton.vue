/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :title="$t('@Collections.productExtend.components.NavigateToCollectionsButton.title')"
        :size="smallSize"
        :disabled="!isAllowedToUpdate"
        @click.native="onNavigateToCollections" />
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    ROUTE_NAME,
} from '@Collections/config/routes';
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'NavigateToCollectionsButton',
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.update,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        onNavigateToCollections() {
            this.$router.push({
                name: ROUTE_NAME.COLLECTIONS_GRID,
            });
        },
    },
};
</script>
