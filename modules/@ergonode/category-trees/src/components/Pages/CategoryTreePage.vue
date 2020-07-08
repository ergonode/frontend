/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #mainAction>
                <Button
                    data-cy="delete-category-tree"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY TREE"
                    :disabled="!$hasAccess(['CATEGORY_TREE_DELETE'])"
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
                data-cy="save-category-tree"
                title="SAVE TREE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';

export default {
    name: 'CategoryTreePage',
    mixins: [
        categoryManagementPageMixin,
    ],
};
</script>
