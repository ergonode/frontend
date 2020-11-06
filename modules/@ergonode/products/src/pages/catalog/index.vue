/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Catalog"
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
                    title="NEW PRODUCT"
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
            :items="asyncTabs"
            :errors="errors"
            :change-values="changeValues">
            <template
                #content="{
                    item,
                    errors: tabErrors,
                    changeValues: tabChangeValues,
                }">
                <HorizontalRoutingTabBarContent
                    :is-fetching-needed="fetchGridData"
                    :scope="item.scope"
                    :change-values="tabChangeValues"
                    :errors="tabErrors"
                    @fetched="onFetchedGridData" />
            </template>
        </HorizontalRoutingTabBar>
        <CreateProductModalForm
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
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'Products',
    components: {
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
        CreateProductModalForm: () => import('@Products/components/Modals/CreateProductModalForm'),
    },
    mixins: [
        gridModalMixin,
        beforeLeavePageMixin,
        asyncTabsMixin,
    ],
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
        extendedMainAction() {
            return this.$getExtendedComponents('@Products/pages/catalog/mainAction');
        },
        extendedModals() {
            return this.$getExtendedComponents('@Products/pages/catalog/injectModal');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.PRODUCT.create,
            ]);
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT.namespace);
        },
    },
    beforeDestroy() {
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        bindingProps({
            props = {},
        }) {
            return {
                privileges: PRIVILEGES.PRODUCT,
                ...props,
            };
        },
    },
    head() {
        return {
            title: 'Products - Ergonode',
        };
    },
};
</script>
