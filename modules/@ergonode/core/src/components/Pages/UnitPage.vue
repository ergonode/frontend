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
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE UNIT"
                    :disabled="!isAllowedToDelete"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            :items="tabs"
            :change-values="changeValues"
            :errors="errors" />
    </Page>
</template>

<script>
import PRIVILEGES from '@Core/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';

export default {
    name: 'UnitPage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.SETTINGS.namespace);
        },
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.delete,
            ]);
        },
    },
};
</script>
