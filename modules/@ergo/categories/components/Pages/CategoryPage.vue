/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('CATEGORY')">
            <template #mainAction>
                <Button
                    data-cy="delete-category"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY"
                    :disabled="!$hasAccess(['CATEGORY_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
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
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';

export default {
    name: 'CategoryPage',
    mixins: [categoryManagementPageMixin],
};
</script>
