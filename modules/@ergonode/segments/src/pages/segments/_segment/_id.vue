/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="code"
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
                <RemoveSegmentButton />
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
import RemoveSegmentButton from '@Segments/components/Buttons/RemoveSegmentButton';
import PRIVILEGES from '@Segments/config/privileges';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'SegmentEdit',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        RemoveSegmentButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('segment/getSegment', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Segment hasn`t been fetched properly',
                });
            },
        });
    },
    computed: {
        ...mapState('segment', [
            'code',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Segments/pages/segments/_segment/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SEGMENT.namespace);
        },
    },
    beforeDestroy() {
        this.__clearSegmentStorage();
        this.__clearConditionStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
        ...mapActions('segment', {
            __clearSegmentStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.SEGMENT,
                ...props,
            };
        },
    },
    head() {
        return {
            title: `${this.code} - Segments - Ergonode`,
        };
    },
};
</script>
