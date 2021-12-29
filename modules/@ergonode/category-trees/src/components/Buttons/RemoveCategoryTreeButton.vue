/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-category-tree"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Trees.tree.components.RemoveCategoryTreeButton.removeButton')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
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
import PRIVILEGES from '@Trees/config/privileges';
import {
    ROUTE_NAME,
} from '@Trees/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveCategoryTreeButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.delete,
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
        ...mapActions('categoryTree', [
            'removeCategoryTree',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Trees.tree.components.RemoveCategoryTreeButton.deleteTitle'),
                applyTitle: this.$t('@Trees._.deleteConfirm'),
                cancelTitle: this.$t('@Trees._.cancel'),
                action: () => this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Trees.tree.components.RemoveCategoryTreeButton.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.CATEGORY_TREES_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Trees.tree.components.RemoveCategoryTreeButton.deleteRequest'),
            });
        },
    },
};
</script>
