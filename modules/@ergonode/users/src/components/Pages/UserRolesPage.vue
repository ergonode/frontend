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
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE ROLE"
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
                title="SAVE ROLE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import editPageMixin from '@Core/mixins/page/editPageMixin';
import PRIVILEGES from '@Users/config/privileges';

export default {
    name: 'UserRolesPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.USER_ROLE.namespace);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.delete,
            ]);
        },
    },
};
</script>
