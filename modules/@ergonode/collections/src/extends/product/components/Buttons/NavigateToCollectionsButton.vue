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
import Button from '@UI/components/Button/Button';

export default {
    name: 'NavigateToCollectionsButton',
    components: {
        Button,
    },
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
