/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NuxtLink
        :to="linkTo">
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
    </NuxtLink>
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
import Fab from '@UI/components/Fab/Fab';
import IconEdit from '@UI/components/Icons/Actions/IconEdit';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    ROUTE_NAME,
} from '@Workflow/config/routes';

export default {
    name: 'UpdateWorkflowTransitionFab',
    components: {
        Fab,
        IconEdit,
    },
    props: {
        transitionId: {
            type: String,
            required: true,
        },
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        linkTo() {
            return {
                name: ROUTE_NAME.WORKFLOW_TRANSITION_EDIT_GENERAL,
                params: {
                    id: this.transitionId,
                },
            };
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
