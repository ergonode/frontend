/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Fab
        :size="regularSize"
        :disabled="!isAllowedToCreate">
        <template #icon="{ color }">
            <IconAdd :fill-color="color" />
        </template>
    </Fab>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import PRIVILEGES from '@Workflow/config/privileges';

export default {
    name: 'CreateWorkflowTransitionFab',
    computed: {
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.create,
            ]);
        },
        regularSize() {
            return SIZE.REGULAR;
        },
    },
};
</script>
