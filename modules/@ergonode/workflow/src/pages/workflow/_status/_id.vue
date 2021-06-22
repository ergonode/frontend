/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="status.code"
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
                <RemoveWorkflowStatusButton />
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
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import RemoveWorkflowStatusButton from '@Workflow/components/Buttons/RemoveWorkflowStatusButton';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowStatusEdit',
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        RemoveWorkflowStatusButton,
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
        await store.dispatch('workflow/getStatus', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Workflow.workflow.pages.id.getStatusRequest'),
                });
            },
        });
        await store.dispatch('workflow/getDefaultStatus', {});
    },
    computed: {
        ...mapState('workflow', [
            'status',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Workflow/pages/workflow/_status/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.WORKFLOW.namespace);
        },
    },
    methods: {
        ...mapActions('workflow', [
            '__setState',
        ]),
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
            title: `${this.status.code} - ${this.$t('@Workflow.workflow._.headTitle')}`,
        };
    },
};
</script>
