/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Segments"
            icon="Templates"
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
    </BasePage>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'SegmentsTabs',
    middleware: ['tab/redirectToSegmentsGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
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
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        titleBarData() {
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
