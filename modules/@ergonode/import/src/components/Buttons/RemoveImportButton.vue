/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Import.import.components.RemoveImportButton.title')"
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
import PRIVILEGES from '@Import/config/privileges';
import {
    ROUTE_NAME,
} from '@Import/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveImportButton',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.IMPORT.delete,
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
        ...mapActions('import', [
            'removeImport',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Import.import.components.RemoveImportButton.confirmTitle'),
                applyTitle: this.$t('@Import._.deleteConfirm'),
                action: () => this.removeImport({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$('@Import.import.components.RemoveImportButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.IMPORTS_GRID,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$('@Import.import.components.RemoveImportButton.errorMessage'),
            });
        },
    },
};
</script>
