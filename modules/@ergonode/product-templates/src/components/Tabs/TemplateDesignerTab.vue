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
            <TemplateDesigner />
            <Button
                :title="$t('core.buttons.submit')"
                :floating="{ bottom: '24px', right: '24px' }"
                @click.native="onSubmit">
                <template
                    v-if="isSubmitting"
                    #prepend="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </GridViewTemplate>
</template>

<script>
import {
    SYSTEM_TYPES,
} from '@Attributes/defaults/attributes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getMaxValueObject,
} from '@Core/models/arrayWrapper';
import {
    isObject,
} from '@Core/models/objectWrapper';
// import TreeDesignerDraggableLayer from '@Templates/components/Template/Base/TreeDesignerDraggableLayer';
import DesignerPlaceholderItem from '@UI/components/Designer/DesignerPlaceholderItem';
import AttributeElementContent from '@Templates/components/TemplateDesigner/ProductDesigner/AttributeElementContent';
import LayoutElement from '@Templates/components/TemplateDesigner/ProductDesigner/LayoutElement';
import SectionElementContent from '@Templates/components/TemplateDesigner/ProductDesigner/SectionElementContent';
import TemplateDesigner from '@Templates/components/TemplateDesigner/TemplateDesigner';
import PRIVILEGES from '@Templates/config/privileges';
import {
    getHighlightingLayoutDropPositions,
} from '@Templates/models/layout/LayoutCalculations';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Button from '@UI/components/Button/Button';
import Designer from '@UI/components/Designer/Designer';
import DesignerBackgroundLayer from '@UI/components/Designer/DesignerBackgroundLayer';
import DropZone from '@UI/components/DropZone/DropZone';
import IconRemoveFilter from '@UI/components/Icons/Actions/IconRemoveFilter';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@UI/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@UI/components/TabBar/VerticalTabBar';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TemplateDesignerTab',
    components: {
        TemplateDesigner,
        Button,
        IconSpinner,
        DropZone,
        FadeTransition,
        GridViewTemplate,
        // TreeDesignerDraggableLayer,
        // DesignerPlaceholderItem,
        // LayoutElement,
        IconRemoveFilter,
        VerticalTabBar,
        // AttributeElementContent,
        // SectionElementContent,
        // SectionTemplateModalForm: () => import('@Templates/components/Modals/SectionTemplateModalForm'),
    },
    mixins: [
        tabFeedbackMixin,
    ],
    data() {
        return {
            highlightedPositions: [],
            isSubmitting: false,
            isSectionAdded: false,
            sectionPosition: null,
            sectionIndex: null,
            sectionElement: null,
            columns: 4,
            maxRow: 0,
        };
    },
    computed: {
        ...mapState('productTemplate', [
            'title',
        ]),
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
                    component: () => import('@Attributes/components/VerticalTabs/AttributesVerticalTab'),
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
    methods: {
        ...mapActions('productTemplate', [
            'updateTemplate',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors();
            this.updateTemplate({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Template has been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
