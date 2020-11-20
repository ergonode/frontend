/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-attribute"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('attribute.page.removeButton')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete :fill-color="color" />
        </template>
    </Button>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    ROUTE_NAME,
} from '@Attributes/config/routes';
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
    name: 'RemoveAttributeButton',
    components: {
        Button,
        IconDelete,
    },
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.delete,
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
        ...mapActions('attribute', [
            'removeAttribute',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('attribute.messages.deleteTitle'),
                applyTitle: this.$t('attribute.messages.deleteConfirm'),
                action: () => {
                    this.removeAttribute({
                        onSuccess: this.onRemoveSuccess,
                        onError: this.onRemoveError,
                    });
                },
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('attribute.messages.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.ATTRIBUTES_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('attribute.errors.deleteRequest'),
            });
        },
    },
};
</script>
