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
            <UpdateSegmentConditionDesignerButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import ConditionSetTreeDesigner from '@Conditions/components/TreeDesigners/ConditionSetTreeDesigner';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateSegmentConditionDesignerButton from '@Segments/components/Buttons/UpdateSegmentConditionDesignerButton';
import RemoveConditionDropZone from '@Segments/components/DropZones/RemoveConditionDropZone';
import PRIVILEGES from '@Segments/config/privileges';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'ConditionDesignerTab',
    components: {
        RemoveConditionDropZone,
        UpdateSegmentConditionDesignerButton,
        GridViewTemplate,
        ConditionSetTreeDesigner,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
        verticalTabs() {
            return [
                {
                    title: this.$t('@Segments.segment.components.ConditionDesignerTab.conditionsTabTitle'),
                    component: () => import('@Conditions/components/VerticalTabs/ConditionsVerticalTab'),
                    icon: () => import('@Categories/components/Icons/IconCategory'),
                    props: {
                        disabled: !this.isAllowedToUpdate,
                        group: 'segment',
                    },
                },
            ];
        },
    },
    beforeDestroy() {
        this.__clearConditionStorage();
    },
    methods: {
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
    },
};
</script>
