/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-status"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Workflow.statusTransition.components.RemoveProductStatusButton.title')"
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
import Button from '@UI/components/Button/Button';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveProductStatusButton',
    components: {
        Button,
        IconDelete,
    },
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.delete,
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
        ...mapActions('productStatus', [
            'removeProductStatus',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Workflow.statusTransition.components.RemoveProductStatusButton.confirmTitle'),
                applyTitle: this.$t('@Workflow._.deleteConfirm'),
                action: () => this.removeProductStatus({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.statusTransition.components.RemoveProductStatusButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW_DESIGNER,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.statusTransition.components.RemoveProductStatusButton.errorMessage'),
            });
        },
    },
};
</script>
