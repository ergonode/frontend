/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-collection"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Collections.collection.components.RemoveCollectionButton.title')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import {
    ROUTE_NAME,
} from '@Collections/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveCollectionButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.delete,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('collection', [
            'removeCollection',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Collections.collection.components.RemoveCollectionButton.confirmTitle'),
                applyTitle: this.$t('@Collections._.deleteConfirm'),
                action: () => this.removeCollection({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Collections.collection.components.RemoveCollectionButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.COLLECTIONS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Collections.collection.components.RemoveCollectionButton.errorMessage'),
            });
        },
    },
};
</script>
