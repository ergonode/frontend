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
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <Button
                    data-cy="delete-collection"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE COLLECTION"
                    :disabled="!isUserAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
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
import PRIVILEGES from '@Collections/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';

export default {
    name: 'CollectionPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isUserAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT_COLLECTION.delete,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT_COLLECTION.namespace);
        },
    },
};
</script>
