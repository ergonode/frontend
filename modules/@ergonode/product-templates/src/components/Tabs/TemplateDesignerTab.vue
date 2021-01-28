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
                        title="REMOVE ELEMENT">
                        <template #icon="{ color }">
                            <IconRemoveFilter :fill-color="color" />
                        </template>
                    </DropZone>
                </FadeTransition>
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
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import UpdateTemplateDesignerButton from '@Templates/components/Buttons/UpdateTemplateDesignerButton';
import TemplateDesigner from '@Templates/components/TemplateDesigner/TemplateDesigner';
import PRIVILEGES from '@Templates/config/privileges';
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
    name: 'TemplateDesignerTab',
    components: {
        TemplateDesigner,
        UpdateTemplateDesignerButton,
        DropZone,
        FadeTransition,
        GridViewTemplate,
        IconRemoveFilter,
        VerticalTabBar,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            isSubmitting: false,
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
        verticalTabs() {
            return [
                {
                    title: 'Product attributes',
                    component: () => import('@Attributes/extends/components/VerticalTabs/AttributesVerticalTab'),
                    props: {
                        isSelectLanguage: false,
                        disabled: !this.isAllowedToUpdate,
                    },
                    icon: () => import('@Attributes/components/Icons/IconAttributes'),
                },
                {
                    title: 'Widgets',
                    component: () => import('@Templates/components/VerticalTabs/WidgetsVerticalTab'),
                    icon: () => import('@Core/components/Icons/Widgets/IconWidget'),
                    props: {
                        disabled: !this.isAllowedToUpdate,
                    },
                },
            ];
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]);
        },
    },
};
</script>
