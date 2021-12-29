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
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesignerTab',
    components: {
        RemoveElementDropZone,
        TemplateDesigner,
        UpdateTemplateDesignerButton,
        GridViewTemplate,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    fetch() {
        const disabledElements = {
            [this.user.language]: {},
        };

        for (let i = this.layoutElements.length - 1; i > -1; i -= 1) {
            disabledElements[this.user.language][this.layoutElements[i].id] = true;
        }

        this.setDisabledScopeElements({
            scope: this.scope,
            disabledElements,
        });
    },
    data() {
        return {
            verticalTabs: [],
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'layoutElements',
        ]),
        ...mapState('authentication', [
            'user',
        ]),
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
    methods: {
        ...mapActions('list', [
            'setDisabledScopeElements',
        ]),
    },
};
</script>
