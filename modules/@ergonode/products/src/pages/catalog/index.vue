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
    </Page>
</template>

<script>
import Button from '@Core/components/Button/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
} from '@Core/defaults/theme';
import gridModalMixin from '@Core/mixins/modals/gridModalMixin';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import PRIVILEGES from '@Products/config/privileges';
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
    },
    head() {
        return {
            title: 'Products - Ergonode',
        };
    },
};
</script>
