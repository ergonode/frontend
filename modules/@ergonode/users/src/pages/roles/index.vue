/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="User roles"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <Button
                    title="NEW ROLE"
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
        <CreateRoleModalForm
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
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UsersTabs',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateRoleModalForm: () => import('@Users/components/Modals/CreateRoleModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        pageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER_ROLE.namespace);
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.create,
            ]);
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    head() {
        return {
            title: 'User roles - Ergonode',
        };
    },
};
</script>
