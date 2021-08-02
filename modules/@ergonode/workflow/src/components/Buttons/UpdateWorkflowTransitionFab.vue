/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        :theme="secondaryTheme"
        :size="tinySize"
        :disabled="!isAllowedToUpdate"
        :style="{backgroundColor: colorWhite}"
        :title="$t('@Workflow.workflow.components.UpdateWorkflowTransitionFab.title')">
        <template #icon>
            <IconEdit :fill-color="colorGreen" />
        </template>
    </Fab>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import PRIVILEGES from '@Workflow/config/privileges';

export default {
    name: 'UpdateWorkflowTransitionFab',
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        tinySize() {
            return SIZE.TINY;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        colorGreen() {
            return GREEN;
        },
        colorWhite() {
            return WHITE;
        },
    },
};
</script>
