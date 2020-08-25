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
            <ConditionSetWrapper :disabled="!isAllowedToUpdate" />
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import PRIVILEGES from '@Transitions/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionDesignerTab',
    components: {
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
        ConditionSetWrapper: () => import('@Conditions/components/ConditionSetDesigner/ConditionSetWrapper'),
    },
    fetch({
        store,
    }) {
        return store.dispatch('conditions/getConditions', {
            group: 'workflow',
        });
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.WORKFLOW.update,
            ]);
        },
        verticalTabs() {
            return [
                {
                    title: 'Conditions',
                    component: () => import('@Conditions/components/Tabs/Lists/ConditionsListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
                },
            ];
        },
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
    destroyed() {
        this.clearGridDesignerStorage();
        this.clearConditionsStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: '__clearStorage',
        }),
        ...mapActions('conditions', {
            clearConditionsStorage: '__clearStorage',
        }),
    },
};
</script>
