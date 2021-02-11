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
                        :title="$t('@Trees.tree.components.CategoryTreeDesignerTab.dropZoneTitle')">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
            </VerticalTabBar>
        </template>
        <template #grid>
            <CategoryTreeDesigner
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
import tabFeedbackMixin from '@Core/mixins/feedback/tabFeedbackMixin';
import UpdateCategoryTreeDesignerButton from '@Trees/components/Buttons/UpdateCategoryTreeDesignerButton';
import CategoryTreeDesigner from '@Trees/components/TreeDesigners/CategoryTreeDesigner';
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
        CategoryTreeDesigner,
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
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
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY_TREE.update,
            ]);
        },
    },
    async mounted() {
        const extendedVerticalTabs = await this.$getExtendMethod('@Trees/components/Tabs/CategoryTreeDesignerTab/verticalTabs', {
            $this: this,
            props: {
                disabled: !this.isAllowedToUpdate,
            },
        });

        extendedVerticalTabs.forEach((tabs) => {
            this.verticalTabs.push(...tabs);
        });
    },
};
</script>
