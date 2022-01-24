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
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import RemoveWorkflowStatusButton from '@Workflow/components/Buttons/RemoveWorkflowStatusButton';
import PRIVILEGES from '@Workflow/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'WorkflowStatusEdit',
    components: {
        RemoveWorkflowStatusButton,
    },
    mixins: [
        asyncTabsMixin,
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
    ],
    validate({
        params,
    }) {
        const uuidRgxString = '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
        const uuidRgx = new RegExp(uuidRgxString, 'i');

        return uuidRgx.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('workflow/getWorkflowById', {
            workflowId: params.workflowId,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Workflow.workflow.pages.id.getTransitionRequest'),
                });
            },
        });
        await store.dispatch('workflow/getStatus', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Workflow.workflow.pages.id.getStatusRequest'),
                });
            },
        });
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
