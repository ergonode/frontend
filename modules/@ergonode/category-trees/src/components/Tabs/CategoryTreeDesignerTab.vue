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
                        title="REMOVE CATEGORY">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
            </VerticalTabBar>
        </template>
        <template #grid>
            <CategoryTreeWrapper />
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
import {
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesignerTab',
    components: {
        VerticalTabBar: () => import('@Core/components/TabBar/VerticalTabBar'),
        CategoryTreeWrapper: () => import('@Trees/components/CategoryTreeDesigner/CategoryTreeWrapper'),
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
    },
    computed: {
        ...mapState('draggable', {
            isElementDragging: state => state.isElementDragging,
        }),
        verticalTabs() {
            return [
                {
                    title: 'Categories',
                    component: () => import('@Trees/components/Tabs/List/CategoriesListTab'),
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
};
</script>
