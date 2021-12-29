/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        data-cy="transition-action-remove"
        :theme="secondaryTheme"
        :size="tinySize"
        :disabled="!isAllowedToDelete"
        :style="{backgroundColor: colorWhite}"
        :title="$t('@Workflow.workflow.components.RemoveWorkflowTransitionFab.title')"
        @click.native="onRemove">
        <template #icon>
            <IconCancel :fill-color="colorRed" />
        </template>
    </Fab>
</template>

<script>
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    RED,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import PRIVILEGES from '@Workflow/config/privileges';

export default {
    name: 'RemoveWorkflowTransitionFab',
    computed: {
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.delete,
            ]);
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        colorRed() {
            return RED;
        },
        colorWhite() {
            return WHITE;
        },
    },
    methods: {
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionFab.confirmTitle'),
                subtitle: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionFab.confirmSubtitle'),
                applyTitle: this.$t('@Workflow.workflow.components.RemoveWorkflowTransitionFab.deleteConfirm'),
                action: this.onRemoveTransition,
            });
        },
        onRemoveTransition() {
            this.$emit('remove-transition');
        },
    },
};
</script>
