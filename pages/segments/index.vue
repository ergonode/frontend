/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Segments"
            icon="Templates"
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
    name: 'SegmentsTabs',
    middleware: ['tab/redirectToSegmentsGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('SEGMENT_READ')) {
            this.tabs.push({
                title: 'Segments',
                route: { name: 'segments-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
        if (this.$hasAccess('CONDITION_READ')) {
            this.tabs.push({
                title: 'Condition sets',
                route: { name: 'condition-sets' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        getTitleBarData() {
            switch (true) {
            case /grid/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE SEGMENT',
                        access: 'SEGMENT_CREATE',
                        path: '/segments/segment/new',
                    },
                    isReadOnly: 'SEGMENT',
                };
            case /condition-sets/.test(this.$route.path):
                return {
                    button: {
                        title: 'CREATE CONDITION SET',
                        access: 'CONDITION_CREATE',
                        path: '/segments/condition-set/new',
                    },
                    isReadOnly: 'CONDITION',
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
