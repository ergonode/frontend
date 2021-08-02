/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-role"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Roles.role.components.RemoveRoleButton.removeButton')"
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
import PRIVILEGES from '@Roles/config/privileges';
import {
    ROUTE_NAME,
} from '@Roles/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveRoleButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.delete,
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
        ...mapActions('role', [
            'removeRole',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Roles.role.components.RemoveRoleButton.deleteTitle'),
                applyTitle: this.$t('@Roles._.deleteConfirm'),
                cancelTitle: this.$t('@Roles._.cancel'),
                action: () => this.removeRole({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Roles.role.components.RemoveRoleButton.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.USER_ROLES_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Roles.role.components.RemoveRoleButton.deleteRequest'),
            });
        },
    },
};
</script>
