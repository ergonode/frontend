/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-resource"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Media.media.components.RemoveResourceButton.title')"
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
import PRIVILEGES from '@Media/config/privileges';
import {
    ROUTE_NAME,
} from '@Media/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveResourceButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.delete,
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
        ...mapActions('media', [
            'removeResource',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Media.media.components.RemoveResourceButton.confirmTitle'),
                applyTitle: this.$t('@Media._.deleteConfirm'),
                action: () => this.removeResource({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Media.media.components.RemoveResourceButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.MEDIA_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Media.media.components.RemoveResourceButton.errorMessage'),
            });
        },
    },
};
</script>
