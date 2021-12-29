/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-user"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Users.user.components.RemoveUserButton.removeButton')"
        :disabled="!isAllowedToDelete"
        @click.native="onRemove">
        <template #prepend="{ color }">
            <IconDelete
                :fill-color="color" />
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
import PRIVILEGES from '@Users/config/privileges';
import {
    ROUTE_NAME,
} from '@Users/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveUserButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.USER.delete,
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
        ...mapActions('user', [
            'removeUser',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Users.user.components.RemoveUserButton.deleteTitle'),
                applyTitle: this.$t('@Users._.deleteConfirm'),
                cancelTitle: this.$t('@Users._.cancel'),
                action: () => this.removeUser({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Users.user.components.RemoveUserButton.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.USERS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Users.user.components.RemoveUserButton.deleteRequest'),
            });
        },
    },
};
</script>
