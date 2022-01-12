/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-status"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.title')"
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
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveWorkflowStatusButton',
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
        ...mapActions('workflow', [
            'removeStatus',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.confirmTitle'),
                subtitle: this.$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.confirmSubtitle'),
                applyTitle: this.$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.applyTitle'),
                action: () => this.removeStatus({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.workflow.components.RemoveWorkflowStatusButton.errorMessage'),
            });
        },
    },
};
</script>
