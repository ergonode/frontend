/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveConditionDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <ConditionSetTreeDesigner
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :disabled="!isAllowedToUpdate" />
            <UpdateProductStatusConditionDesignerButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import PRIVILEGES from '@Statuses/config/privileges';
import UpdateProductStatusConditionDesignerButton
    from '@Transitions/components/Buttons/UpdateProductStatusConditionDesignerButton';
import RemoveConditionDropZone from '@Transitions/components/DropZones/RemoveConditionDropZone';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import ConditionSetTreeDesigner from '@Workflow/components/ConditionSetTreeDesigner/ConditionSetTreeDesigner';

export default {
    name: 'ConditionDesignerTab',
    components: {
        RemoveConditionDropZone,
        UpdateProductStatusConditionDesignerButton,
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
        const extendedVerticalTabs = await this.$getExtendMethod('@Transitions/components/Tabs/ConditionDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
};
</script>
