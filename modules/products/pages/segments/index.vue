/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Segments"
            :is-read-only="$isReadOnly('SEGMENT')">
            <template #mainAction>
                <Button
                    title="NEW SEGMENT"
                    :size="smallSize"
                    :disabled="!$hasAccess(['SEGMENT_CREATE'])"
                    @click.native="addSegment">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <SegmentsGridTab />
    </Page>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import Button from '~/core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import SegmentsGridTab from '~/components/Card/Grid/SegmentsGridTab';

export default {
    name: 'SegmentsPage',
    components: {
        SegmentsGridTab,
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'segmentsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('segmentsGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addSegment() {
            this.$router.push({ path: 'segments/segment/new/general' });
        },
    },
    async fetch({ app, store }) {
        const gridPath = `${store.state.authentication.user.language}/segments`;

        app.$registerStore({
            module: gridModule,
            moduleName: 'segmentsGrid',
            store,
        });
        await store.dispatch('segmentsGrid/getData', gridPath);
    },
};
</script>
