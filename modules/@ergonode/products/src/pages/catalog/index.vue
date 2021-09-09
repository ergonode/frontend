/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="$t('@Products.product._.title')"
            :is-read-only="isReadOnly">
            <template #mainAction>
                <template
                    v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <CreateProductButton />
            </template>
        </TitleBar>
        <HorizontalRoutingTabBar
            v-if="asyncTabs"
            :items="asyncTabs"
            :errors="errors"
            :change-values="changeValues" />
    </Page>
</template>

<script>
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import asyncTabsMixin from '@Core/mixins/tab/asyncTabsMixin';
import CreateProductButton from '@Products/components/Buttons/CreateProductButton';
import PRIVILEGES from '@Products/config/privileges';
import Button from '@UI/components/Button/Button';
import IconAdd from '@UI/components/Icons/Actions/IconAdd';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
import {
    mapState,
} from 'vuex';

export default {
    name: 'Products',
    components: {
        CreateProductButton,
        TitleBar,
        Page,
        HorizontalRoutingTabBar,
        Button,
        IconAdd,
    },
    mixins: [
        beforeRouteLeaveMixin,
        asyncTabsMixin,
    ],
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Products/pages/catalog/mainAction');
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT.namespace);
        },
    },
    methods: {
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
            title: this.$t('@Products.product._.headTitle'),
        };
    },
};
</script>
