/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab />
            </template>
            <!-- <template #mainAction>
                <RemoveUserButton />
            </template> -->
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
// import RemoveUserButton from '@Users/components/Buttons/RemoveUserButton';
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UserPage',
    // components: {
    // RemoveUserButton,
    // },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER.namespace);
        },
    },
};
</script>
