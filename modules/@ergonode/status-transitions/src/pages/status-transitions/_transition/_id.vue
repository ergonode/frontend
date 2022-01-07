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
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveStatusTransitionButton from '@Transitions/components/Buttons/RemoveStatusTransitionButton';
import PRIVILEGES from '@Transitions/config/privileges';
import {
    mapState,
} from 'vuex';

export default {
    name: 'TransitionEdit',
    components: {
        RemoveStatusTransitionButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
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
            'from',
            'to',
        ]),
        title() {
            return `${this.from.value} -> ${this.to.value}`;
        },
        extendedMainAction() {
            return this.$getExtendSlot('@Transitions/pages/status-transitions/_transition/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.WORKFLOW.namespace);
        },
    },
    methods: {
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
