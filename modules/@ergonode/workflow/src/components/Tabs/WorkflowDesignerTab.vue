/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-tab">
        <WorkflowDesigner />
        <CreateWorkflowTransitionsButton />
    </div>
</template>

<script>
import CreateWorkflowTransitionsButton from '@Workflow/components/Buttons/CreateWorkflowTransitionsButton';
import WorkflowDesigner from '@Workflow/components/Designers/WorkflowDesigner';

export default {
    name: 'WorkflowDesignerTab',
    components: {
        WorkflowDesigner,
        CreateWorkflowTransitionsButton,
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
