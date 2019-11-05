/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Workflow"
            icon="Flow"
            :is-read-only="$isReadOnly(titleBarData.isReadOnly)">
            <template
                v-if="titleBarData.button"
                #buttons>
                <PrependIconButton
                    :title="titleBarData.button.title"
                    :size="smallSize"
                    :disabled="!$hasAccess(titleBarData.button.access)"
                    @click.native="addNew(titleBarData.button.path)">
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
import { SIZES } from '~/defaults/buttons';
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
        smallSize() {
            return SIZES.SMALL;
        },
        titleBarData() {
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
