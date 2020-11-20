/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar :title="title">
            <template #prependHeader>
                <NavigateBackFab />
            </template>
            <template #mainAction>
                <RemoveResourceButton />
            </template>
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
import RemoveResourceButton from '@Media/components/Buttons/RemoveResourceButton';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'ResourcePage',
    components: {
        RemoveResourceButton,
    },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
    },
};
</script>
