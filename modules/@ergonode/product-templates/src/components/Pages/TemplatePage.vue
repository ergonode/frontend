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
                    data-cy="delete-segment"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE TEMPLATE"
                    :disabled="!isAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                data-cy="save-template"
                title="SAVE TEMPLATE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import editPageMixin from '@Core/mixins/page/editPageMixin';
import PRIVILEGES from '@Templates/config/privileges';

export default {
    name: 'TemplatePage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.TEMPLATE_DESIGNER.namespace);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.delete,
            ]);
        },
    },
};
</script>
