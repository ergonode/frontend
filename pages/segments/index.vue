/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Segments"
            icon="Templates"
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
    name: 'SegmentsTabs',
    middleware: ['tab/redirectToSegmentsGrid'],
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess(['SEGMENT_READ'])) {
            this.tabs.push({
                title: 'Segments',
                route: { name: 'segments-grid' },
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
                        title: 'NEW SEGMENT',
                        access: ['SEGMENT_CREATE'],
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
