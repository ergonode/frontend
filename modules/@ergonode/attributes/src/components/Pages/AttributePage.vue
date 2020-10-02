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
                    data-cy="delete-attribute"
                    :theme="secondaryTheme"
                    :size="smallSize"
                    :title="$t('attribute.page.removeButton')"
                    :disabled="!isAllowedToDelete"
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
import PRIVILEGES from '@Attributes/config/privileges';
import editPageMixin from '@Core/mixins/page/editPageMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AttributePage',
    mixins: [
        editPageMixin,
    ],
    computed: {
        ...mapState('attribute', [
            'type',
        ]),
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        isAllowedToDelete() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.delete,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.ATTRIBUTE.namespace);
        },
    },
    asyncComputed: {
        async asyncTabs() {
            const tmpTabs = getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
            const type = getKeyByValue(this.attrTypes, this.type);
            const tabs = await this.$extendMethods('@Core/pages/tabs', {
                $this: this,
                type,
                tabs: tmpTabs,
            });

            return tabs.length ? [
                ...new Set([].concat(...tabs)),
            ] : tmpTabs;
        },
    },
};
</script>
