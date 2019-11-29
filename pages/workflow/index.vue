/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Workflow"
            icon="Flow"
            :is-read-only="$isReadOnly(titleBarData.isReadOnly)">
            <template
                v-if="titleBarData.button"
                #mainAction>
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
    </Page>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'WorkflowTabs',
    middleware: ['tab/redirectToStatusesGrid'],
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess(['WORKFLOW_READ'])) {
            this.tabs.push({
                title: 'Product statuses',
                route: { name: 'workflow-statuses' },
            });
            this.tabs.push({
                title: 'Transitions',
                route: { name: 'workflow-transitions' },
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
                        title: 'NEW STATUS',
                        access: ['WORKFLOW_CREATE'],
                        path: '/workflow/status/new',
                    },
                    isReadOnly: 'WORKFLOW',
                };
            case /transitions/.test(this.$route.path):
                return {
                    button: {
                        title: 'NEW TRANSITIONS',
                        access: ['WORKFLOW_CREATE'],
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
