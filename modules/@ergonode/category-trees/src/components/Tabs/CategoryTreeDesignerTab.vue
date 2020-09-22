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
            <Button
                title="SAVE CHANGES"
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
    GRAPHITE_LIGHT,
} from '@Core/assets/scss/_js-variables/colors.scss';
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
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isSubmitting: false,
        };
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
    methods: {
        ...mapActions('categoryTree', [
            'updateCategoryTree',
        ]),
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
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
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
