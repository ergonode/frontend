/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveStatusTransitionButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveStatusTransitionButton from '@Transitions/components/Buttons/RemoveStatusTransitionButton';
import PRIVILEGES from '@Transitions/config/privileges';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TransitionEdit',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        RemoveStatusTransitionButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
    ],
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('productStatus/getProductStatuses', {});
        await store.dispatch('statusTransition/getStatusTransition', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Transitions.transition.pages.id.getRequest'),
                });
            },
        });
    },
    computed: {
        ...mapState('statusTransition', [
            'source',
            'destination',
        ]),
        title() {
            return `${this.source.value} -> ${this.destination.value}`;
        },
        extendedMainAction() {
            return this.$getExtendSlot('@Transitions/pages/status-transitions/_transition/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.WORKFLOW.namespace);
        },
    },
    beforeDestroy() {
        this.__clearTransitionStorage();
        this.__clearConditionStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
        ...mapActions('statusTransition', {
            __clearTransitionStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.WORKFLOW,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.title} - ${this.$t('@Transitions.transition._.headTitle')}`,
        };
    },
};
</script>
