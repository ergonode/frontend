/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Segments"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    data-cy="new-segment"
                    title="NEW SEGMENT"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <CreateSegmentModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
    </Page>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import pageMixin from '@Core/mixins/page/pageMixin';
import PRIVILEGES from '@Segments/config/privileges';

export default {
    name: 'SegmentsPage',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateSegmentModalForm: () => import('@Segments/components/Modals/CreateSegmentModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        pageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SEGMENT.namespace);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.SEGMENT.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    head() {
        return {
            title: 'Segments - Ergonode',
        };
    },
};
</script>
