/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-read-only="$isReadOnly('CATEGORY')"
            @navigateBack="onDismiss">
            <template #mainAction>
                <Button
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
                title="SAVE CATEGORY"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import categoryManagementPageBaseMixin from '@Core/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryPage',
    mixins: [categoryManagementPageBaseMixin],
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
};
</script>
