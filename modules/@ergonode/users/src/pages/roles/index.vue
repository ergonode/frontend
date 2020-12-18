/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('role.page.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <CreateRoleButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import CreateRoleButton from '@Users/components/Buttons/CreateRoleButton';
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UsersTabs',
    components: {
        CreateRoleButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER_ROLE.namespace);
        },
    },
    head() {
        return {
            title: this.$t('role.page.head'),
        };
    },
};
</script>
