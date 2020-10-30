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
            <ConditionSetWrapper
                :scope="scope"
                :change-values="changeValues"
                :errors="errors"
                :disabled="!isAllowedToUpdate" />
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
import ConditionSetWrapper from '@Conditions/components/ConditionSetDesigner/ConditionSetWrapper';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import PRIVILEGES from '@Segments/config/privileges';
import {
    GRAPHITE_LIGHT,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    Z_INDEX_LVL_2,
} from '@UI/assets/scss/_js-variables/indexes.scss';
import Button from '@UI/components/Button/Button';
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
    name: 'ConditionDesignerTab',
    components: {
        IconSpinner,
        Button,
        GridViewTemplate,
        IconRemoveFilter,
        DropZone,
        FadeTransition,
        VerticalTabBar,
        ConditionSetWrapper,
    },
    mixins: [
        tabFeedbackMixin,
    ],
    async fetch({
        store,
    }) {
        await store.dispatch('condition/getConditions', {
            group: 'segment',
        });
    },
    data() {
        return {
            isSubmitting: false,
        };
    },
    computed: {
        ...mapState('segment', [
            'conditionSetId',
        ]),
        ...mapState('draggable', [
            'isElementDragging',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.update,
            ]);
        },
        verticalTabs() {
            return [
                {
                    title: 'Conditions',
                    component: () => import('@Conditions/components/Tabs/Lists/ConditionsListTab'),
                    iconComponent: () => import('@Categories/components/Icons/IconCategory'),
                    props: {
                        disabled: !this.isAllowedToUpdate,
                    },
                },
            ];
        },
        saveChangesButtonFloatingStyle() {
            return {
                bottom: '24px',
                right: '24px',
                zIndex: Z_INDEX_LVL_2,
            };
        },
        isDropZoneVisible() {
            return this.isElementDragging === DRAGGED_ELEMENT.TEMPLATE;
        },
        graphiteLightColor() {
            return GRAPHITE_LIGHT;
        },
    },
    beforeDestroy() {
        this.__clearGridDesignerStorage();
        this.__clearConditionStorage();
    },
    methods: {
        ...mapActions('condition', [
            'createConditionSet',
            'updateConditionSet',
        ]),
        ...mapActions('gridDesigner', {
            __clearGridDesignerStorage: '__clearStorage',
        }),
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
        ...mapActions('segment', [
            'updateSegment',
            '__setState',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);

            if (!this.conditionSetId) {
                this.createConditionSet({
                    scope: this.scope,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            } else {
                this.updateConditionSet({
                    scope: this.scope,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            }
        },
        async onUpdateSuccess(id) {
            this.__setState({
                key: 'conditionSetId',
                value: id,
            });

            await this.updateSegment({
                scope: this.scope,
            });

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Segment conditions have been updated',
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
