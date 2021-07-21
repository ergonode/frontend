/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveTransitionConditionDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <ConditionSetTreeDesigner
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :disabled="!isAllowedToUpdate" />
            <UpdateWorkflowTransitionConditionDesignerButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import ConditionSetTreeDesigner from '@Conditions/components/TreeDesigners/ConditionSetTreeDesigner';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import PRIVILEGES from '@Statuses/config/privileges';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import UpdateWorkflowTransitionConditionDesignerButton
    from '@Workflow/components/Buttons/UpdateWorkflowTransitionConditionDesignerButton';
import RemoveTransitionConditionDropZone from '@Workflow/components/DropZones/RemoveTransitionConditionDropZone';

export default {
    name: 'WorkflowTransitionConditionDesignerTab',
    components: {
        RemoveTransitionConditionDropZone,
        UpdateWorkflowTransitionConditionDesignerButton,
        GridViewTemplate,
        ConditionSetTreeDesigner,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            verticalTabs: [],
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Workflow/components/Tabs/WorkflowTransitionConditionDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
};
</script>
