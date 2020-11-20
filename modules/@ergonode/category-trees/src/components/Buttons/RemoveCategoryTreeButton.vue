/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-category-tree"
        :theme="secondaryTheme"
        :size="smallSize"
        title="REMOVE CATEGORY TREE"
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
import Button from '@UI/components/Button/Button';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveCategoryTreeButton',
    components: {
        Button,
        IconDelete,
    },
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
                title: 'Are you sure you want to delete this tree?',
                applyTitle: 'YES, REMOVE',
                action: () => this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree removed',
            });
            this.$router.push({
                name: ROUTE_NAME.CATEGORY_TREES_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Catgory tree hasn`t been deleted',
            });
        },
    },
};
</script>
