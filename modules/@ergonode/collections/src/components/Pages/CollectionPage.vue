/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="isReadOnly">
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
        <HorizontalRoutingTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                data-cy="save-collection"
                title="SAVE COLLECTION"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import PRIVILEGES from '@Collections/config/privileges';
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';

export default {
    name: 'CollectionPage',
    mixins: [
        categoryManagementPageMixin,
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
