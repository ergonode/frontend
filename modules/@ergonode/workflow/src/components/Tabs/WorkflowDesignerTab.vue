/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="workflow-designer-tab">
        <WorkflowDesigner
            :scope="scope"
            :errors="errors"
            :changed-values="changeValues"
            @layoutElements="layoutElementsMapper" />
        <CreateWorkflowTransitionsButton
            :scope="scope"
            :errors="errors"
            :changed-values="changeValues"
            :transitions="mappedTransitions" />
    </div>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import CreateWorkflowTransitionsButton from '@Workflow/components/Buttons/CreateWorkflowTransitionsButton';
import WorkflowDesigner from '@Workflow/components/Designers/WorkflowDesigner';
import {
    getMappedTransitions,
} from '@Workflow/models/workflowDesigner';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowDesignerTab',
    components: {
        WorkflowDesigner,
        CreateWorkflowTransitionsButton,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            mappedTransitions: [],
        };
    },
    computed: {
        ...mapState('workflow', [
            'transitions',
        ]),
    },
    methods: {
        layoutElementsMapper(layoutElements) {
            this.mappedTransitions = getMappedTransitions({
                layoutElements,
                transitions: this.transitions,
            });
        },
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
