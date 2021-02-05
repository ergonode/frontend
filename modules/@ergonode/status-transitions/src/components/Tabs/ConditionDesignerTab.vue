/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs">
                <FadeTransition>
                    <DropZone
                        v-show="isDropZoneVisible"
                        :hover-background-color="graphiteLightColor"
                        title="REMOVE CONDITION">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
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
import ConditionSetTreeDesigner from '@Conditions/components/TreeDesigners/ConditionSetTreeDesigner';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateProductStatusConditionDesignerButton
    from '@Statuses/components/Buttons/UpdateProductStatusConditionDesignerButton';
import PRIVILEGES from '@Statuses/config/privileges';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionDesignerTab',
    components: {
        UpdateProductStatusConditionDesignerButton,
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        VerticalTabBar,
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
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Transitions/components/Tabs/ConditionDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        extendedVerticalTabs.forEach((tabs) => {
            this.verticalTabs.push(...tabs);
        });
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
