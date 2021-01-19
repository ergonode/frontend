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
            <CategoryTreeWrapper
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
            <UpdateCategoryTreeDesignerButton
                :scope="scope"
                :change-values="changeValues"
                :errors="errors" />
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import UpdateCategoryTreeDesignerButton from '@Trees/components/Buttons/UpdateCategoryTreeDesignerButton';
import CategoryTreeWrapper from '@Trees/components/CategoryTreeDesigner/CategoryTreeWrapper';
import PRIVILEGES from '@Trees/config/privileges';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesignerTab',
    components: {
        UpdateCategoryTreeDesignerButton,
        VerticalTabBar,
        CategoryTreeWrapper,
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        verticalTabs() {
            return [
                {
                    title: 'Categories',
                    component: () => import('@Categories/components/VerticalTabs/CategoriesVerticalTab'),
                    icon: () => import('@Trees/components/Icons/IconTree'),
                    props: {
                        isSelectLanguage: true,
                        disabled: !this.$hasAccess([
                            PRIVILEGES.CATEGORY_TREE.update,
                        ]),
                    },
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
