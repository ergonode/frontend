/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <RemoveElementDropZone />
            </VerticalTabBar>
        </template>
        <template #grid>
            <TemplateDesigner
                :scope="scope"
                :errors="errors"
                :changed-values="changeValues" />
            <UpdateTemplateDesignerButton
                :scope="scope"
                :errors="errors"
                :change-values="changeValues" />
        </template>
    </GridViewTemplate>
</template>

<script>
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateTemplateDesignerButton from '@Templates/components/Buttons/UpdateTemplateDesignerButton';
import RemoveElementDropZone from '@Templates/components/DropZones/RemoveElementDropZone';
import TemplateDesigner from '@Templates/components/TemplateDesigner/TemplateDesigner';
import PRIVILEGES from '@Templates/config/privileges';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';

export default {
    name: 'TemplateDesignerTab',
    components: {
        RemoveElementDropZone,
        TemplateDesigner,
        UpdateTemplateDesignerButton,
        GridViewTemplate,
        VerticalTabBar,
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
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Templates/components/Tabs/TemplateDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        this.verticalTabs = [].concat(...extendedVerticalTabs);
    },
};
</script>
