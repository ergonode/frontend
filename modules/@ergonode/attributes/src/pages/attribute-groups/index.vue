/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attribute groups"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <Button
                    data-cy="new-attribute-group"
                    title="NEW ATTRIBUTE GROUP"
                    :size="smallSize"
                    :disabled="!isAllowedToCreate"
                    @click.native="onShowModal">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
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
        <CreateAttributeGroupModalForm
            v-if="isModalVisible"
            @close="onCloseModal"
            @created="onCreatedData" />
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
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateAttributeGroupModalForm: () => import('@Attributes/components/Modals/CreateAttributeGroupModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        extendedMainAction() {
            return this.$getExtendedComponents('@Attributes/pages/attribute-groups/mainAction');
        },
        extendedModals() {
            return this.$getExtendedComponents('@Attributes/pages/attribute-groups/injectModal');
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.create,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(
                PRIVILEGES.ATTRIBUTE_GROUP.namespace,
            );
        },
        smallSize() {
            return SIZE.SMALL;
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
            title: 'Attribute groups - Ergonode',
        };
    },
};
</script>
