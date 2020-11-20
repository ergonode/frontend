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
            <template #mainAction>
                <RemoveCollectionButton />
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
import RemoveCollectionButton from '@Collections/components/Buttons/RemoveCollectionButton';
import PRIVILEGES from '@Collections/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';

export default {
    name: 'CollectionPage',
    components: {
        RemoveCollectionButton,
    },
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT_COLLECTION.namespace);
        },
    },
};
</script>
