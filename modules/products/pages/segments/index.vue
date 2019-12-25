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
import { SIZES } from '@Core/defaults/buttons';
import gridModule from '@Core/reusableStore/grid/state';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import SegmentsGridTab from '~/components/Card/Grid/SegmentsGridTab';

export default {
    name: 'SegmentsPage',
    components: {
        SegmentsGridTab,
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
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
