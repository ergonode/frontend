/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Button
        data-cy="delete-transition"
        :theme="secondaryTheme"
        :size="smallSize"
        :title="$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.title')"
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
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'RemoveWorkflowTransitionButton',
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
            'removeTransition',
        ]),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.confirmTitle'),
                subtitle: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.confirmSubtitle'),
                applyTitle: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.deleteConfirm'),
                action: this.onRemoveTransition,
            });
        },
        onRemoveTransition() {
            this.removeTransition({
                workflowId: this.$route.params.workflowId,
                onSuccess: this.onRemoveSuccess,
                onError: this.onRemoveError,
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.successMessage'),
            });
            this.$router.push({
                name: ROUTE_NAME.WORKFLOW,
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionButton.errorMessage'),
            });
        },
    },
};
</script>
