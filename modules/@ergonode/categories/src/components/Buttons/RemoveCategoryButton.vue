/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-category"
        :theme="secondaryTheme"
        :size="smallSize"
        title="REMOVE CATEGORY"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@Categories/config/privileges';
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
import Button from '@UI/components/Button/Button';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveCategoryButton',
    components: {
        Button,
        IconDelete,
    },
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.delete,
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
        ...mapActions('category', [
            'removeCategory',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('category.messages.deleteTitle'),
                applyTitle: this.$t('category.messages.deleteConfirm'),
                action: () => {
                    this.removeCategory({
                        onSuccess: this.onRemoveSuccess,
                        onError: this.onRemoveError,
                    });
                },
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('category.messages.deleteSuccess'),
            });
            this.$router.push({
                name: 'categories-grid',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('category.errors.deleteRequest'),
            });
        },
    },
};
</script>
