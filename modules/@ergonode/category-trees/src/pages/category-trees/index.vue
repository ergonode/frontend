/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Trees.tree._.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateCategoryTreeButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import CreateCategoryTreeButton from '@Trees/components/Buttons/CreateCategoryTreeButton';
import PRIVILEGES from '@Trees/config/privileges';

export default {
    name: 'CategoryTrees',
    components: {
        CreateCategoryTreeButton,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Trees/pages/category-trees/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.CATEGORY_TREE.namespace);
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.CATEGORY_TREE,
                ...props,
            };
        },
    },
    head() {
        return {
            title: this.$t('@Trees.tree._.headTitle'),
        };
    },
};
</script>
