/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-tab">
        <WorkflowDesigner />
        <UpdateTransitionsButton />
    </div>
</template>

<script>
import UpdateTransitionsButton from '@Modules/@ergonode/workflow/src/components/Buttons/UpdateTransitionsButton';
import WorkflowDesigner from '@Modules/@ergonode/workflow/src/components/Designers/WorkflowDesigner';

export default {
    name: 'WorkflowDesignerTab',
    components: {
        WorkflowDesigner,
        UpdateTransitionsButton,
    },
};
</script>

<style lang="scss" scoped>
    .workflow-designer-tab {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
</style>
