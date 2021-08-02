/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="sku"
            :is-read-only="isReadOnly">
            <template #prependHeader>
                <NavigateBackFab :previous-route="previousRoute" />
            </template>
            <template #mainAction>
                <template v-for="(actionItem, index) in extendedMainAction">
                    <Component
                        :is="actionItem.component"
                        :key="index"
                        v-bind="bindingProps(actionItem)" />
                </template>
                <RemoveProductButton />
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
} from '@Core/defaults/theme';
import beforeRouteEnterMixin from '@Core/mixins/route/beforeRouteEnterMixin';
import beforeRouteLeaveMixin from '@Core/mixins/route/beforeRouteLeaveMixin';
import beforeRouteUpdateMixin from '@Core/mixins/route/beforeRouteUpdateMixin';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import RemoveProductButton from '@Products/components/Buttons/RemoveProductButton';
import PRIVILEGES from '@Products/config/privileges';
import Footer from '@UI/components/Layout/Footer/Footer';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ProductEdit',
    components: {
        Footer,
        RemoveProductButton,
    },
    mixins: [
        beforeRouteEnterMixin,
        beforeRouteLeaveMixin,
        beforeRouteUpdateMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        const {
            id,
        } = params;

        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'productTypes',
            ],
        });

        await store.dispatch('product/getProduct', {
            id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: app.i18n.t('@Products.product.pages.id.getProductRequest'),
                });
            },
        });
    },
    data() {
        return {
            asyncTabs: null,
        };
    },
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
        ...mapState('product', [
            'sku',
            'type',
        ]),
        ...mapState('dictionaries', [
            'productTypes',
        ]),
        extendedMainAction() {
            return this.$getExtendSlot('@Products/pages/catalog/_product/mainAction');
        },
        smallSize() {
            return SIZE.SMALL;
        },
        isReadOnly() {
            return this.$isReadOnly(PRIVILEGES.PRODUCT.namespace);
        },
    },
    watch: {
        $route: {
            immediate: true,
            async handler() {
                const tmpTabs = getNestedTabRoutes({
                    hasAccess: this.$hasAccess,
                    routes: this.$router.options.routes,
                    route: this.$route,
                });
                const type = getKeyByValue(this.productTypes, this.type);
                const tabs = await this.$getExtendMethod('@Core/pages/tabs', {
                    $this: this,
                    type,
                    tabs: tmpTabs,
                });

                this.asyncTabs = tabs.length ? Array.from(new Set([].concat(...tabs))) : tmpTabs;
            },
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
            title: `${this.sku} - ${this.$t('@Products.product._.headTitle')}`,
        };
    },
};
</script>
