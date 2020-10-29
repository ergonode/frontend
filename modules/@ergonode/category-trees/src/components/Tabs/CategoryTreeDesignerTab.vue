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
            <Button
                title="SAVE CHANGES"
                :floating="saveChangesButtonFloatingStyle"
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
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    Z_INDEX_LVL_2,
} from '@Core/assets/scss/_js-variables/indexes.scss';
import Button from '@Core/components/Button/Button';
import DropZone from '@Core/components/DropZone/DropZone';
import IconRemoveFilter from '@Core/components/Icons/Actions/IconRemoveFilter';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';
import VerticalTabBar from '@Core/components/TabBar/VerticalTabBar';
import FadeTransition from '@Core/components/Transitions/FadeTransition';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import CategoryTreeWrapper from '@Trees/components/CategoryTreeDesigner/CategoryTreeWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreeDesignerTab',
    components: {
        Button,
        IconSpinner,
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
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
        ]),
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
        saveChangesButtonFloatingStyle() {
            return {
                bottom: '24px',
                right: '24px',
                zIndex: Z_INDEX_LVL_2,
            };
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
    methods: {
        ...mapActions('categoryTree', [
            'updateCategoryTree',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateCategoryTree({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree has been updated',
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
