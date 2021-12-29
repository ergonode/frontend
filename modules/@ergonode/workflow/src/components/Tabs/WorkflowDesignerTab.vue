/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-tab">
        <WorkflowDesigner
            :scope="scope"
            :errors="errors"
            :change-values="changeValues" />
        <CreateWorkflowTransitionsButton
            :scope="scope"
            :errors="errors"
            :change-values="changeValues" />
    </div>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import CreateWorkflowTransitionsButton from '@Workflow/components/Buttons/CreateWorkflowTransitionsButton';
import WorkflowDesigner from '@Workflow/components/Designers/WorkflowDesigner';

export default {
    name: 'WorkflowDesignerTab',
    components: {
        WorkflowDesigner,
        CreateWorkflowTransitionsButton,
    },
    mixins: [
        tabFeedbackMixin,
    ],
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
