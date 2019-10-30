/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Workflow"
            icon="Flow"
            :is-read-only="$isReadOnly(getTitleBarData.isReadOnly)">
            <template
                v-if="getTitleBarData.button"
                #buttons>
                <PrependIconButton
                    :title="getTitleBarData.button.title"
                    size="small"
                    :disabled="!$hasAccess(getTitleBarData.button.access)"
                    @click.native="addNew(getTitleBarData.button.path)">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'WorkflowTabs',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('WORKFLOW_READ')) {
            this.tabs.push({
                title: 'Product statuses',
                route: { name: 'workflow-statuses' },
                active: true,
                isContextualMenu: false,
            });
            this.tabs.push({
                title: 'Transitions',
                route: { name: 'workflow-transitions' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        getTitleBarData() {
            switch (true) {
            case /statuses/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE STATUS',
                        access: 'WORKFLOW_CREATE',
                        path: '/workflow/status/new',
                    },
                    isReadOnly: 'WORKFLOW',
                };
            case /transitions/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE TRANSITIONS',
                        access: 'WORKFLOW_CREATE',
                        path: '/workflow/transition/new',
                    },
                    isReadOnly: 'WORKFLOW',
                };
            default:
                return {};
            }
        },
    },
    methods: {
        addNew(path) {
            this.$router.push(path);
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
