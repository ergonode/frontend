/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar :title="title">
            <template #prependHeader>
                <NavigationBackFab />
            </template>
            <template #mainAction>
                <!-- TODO: Uncomment when API endpoint is ready -->
                <!--                <Button-->
                <!--                    :theme="secondaryTheme"-->
                <!--                    :size="smallSize"-->
                <!--                    title="REMOVE RESOURCE"-->
                <!--                    :disabled="!isUserAllowedToDelete"-->
                <!--                    @click.native="onRemove">-->
                <!--                    <template #prepend="{ color }">-->
                <!--                        <IconDelete :fill-color="color" />-->
                <!--                    </template>-->
                <!--                </Button>-->
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
import editPageMixin from '@Core/mixins/page/editPageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Media/config/privileges';

export default {
    name: 'ResourcePage',
    mixins: [
        editPageMixin,
        asyncTabsMixin,
    ],
    computed: {
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.MULTIMEDIA.namespace);
        },
        isUserAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.MULTIMEDIA.delete,
            ]);
        },
    },
};
</script>
