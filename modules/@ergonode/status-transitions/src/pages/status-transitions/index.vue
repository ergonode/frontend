/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Transitions.transition._.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateStatusTransitionButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import CreateStatusTransitionButton from '@Transitions/components/Buttons/CreateStatusTransitionButton';
import PRIVILEGES from '@Transitions/config/privileges';

export default {
    name: 'WorkflowTabs',
    components: {
        CreateStatusTransitionButton,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Transitions/pages/status-transitions/mainAction');
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
            title: this.$t('@Transitions.transition._.headTitle'),
        };
    },
};
</script>
