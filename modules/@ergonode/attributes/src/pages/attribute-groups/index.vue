/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('attributeGroup.page.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateAttributeGroupButton @created="onCreatedData" />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs">
            <template #content>
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <template
            v-for="(modal, index) in extendedModals">
            <Component
                :is="modal.component"
                :key="index"
                v-bind="bindingProps(modal)" />
        </template>
    </Page>
</template>

<script>
import CreateAttributeGroupButton from '@Attributes/components/Buttons/CreateAttributeGroupButton';
import PRIVILEGES from '@Attributes/config/privileges';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'AttributeTabs',
    components: {
        CreateAttributeGroupButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendSlot('@Attributes/pages/attribute-groups/mainAction');
        },
        extendedModals() {
            return this.$getExtendSlot('@Attributes/pages/attribute-groups/injectModal');
        },
        isReadOnly() {
            return this.$isReadOnly(
                PRIVILEGES.ATTRIBUTE_GROUP.namespace,
            );
        },
    },
    methods: {
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.ATTRIBUTE_GROUP,
                ...props,
            };
        },
    },
    head() {
        return {
            title: this.$t('attributeGroup.page.head'),
        };
    },
};
</script>
