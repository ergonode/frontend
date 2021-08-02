/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-attribute"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Attributes.attribute.components.RemoveAttributeButton.removeButton')"
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
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveAttributeButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.delete,
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
                title: this.$t('@Attributes.attribute.components.RemoveAttributeButton.deleteTitle'),
                applyTitle: this.$t('@Attributes._.deleteConfirm'),
                cancelTitle: this.$t('@Attributes._.cancel'),
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
                message: this.$t('@Attributes.attribute.components.RemoveAttributeButton.deleteSuccess'),
            });
            this.$router.push({
                name: ROUTE_NAME.ATTRIBUTES_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Attributes.attribute.components.RemoveAttributeButton.deleteRequest'),
            });
        },
    },
};
</script>
