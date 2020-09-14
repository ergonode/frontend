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
                    data-cy="delete-category"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY"
                    :disabled="!isAllowedToDelete"
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
                data-cy="save-category"
                title="SAVE CATEGORY"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import PRIVILEGES from '@Categories/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';

export default {
    name: 'CategoryPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CATEGORY.namespace);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.delete,
            ]);
        },
    },
};
</script>
