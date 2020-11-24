/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductStatusPage :title="code" />
</template>

<script>

import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import ProductStatusPage from '@Statuses/components/Pages/ProductStatusPage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'StatusEdit',
    components: {
        ProductStatusPage,
    },
    mixins: [
        beforeLeavePageMixin,
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
        await store.dispatch('productStatus/getProductStatus', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Product status hasn`t been fetched properly',
                    });
                }
            },
        });
        await store.dispatch('productStatus/getDefaultStatus', {});
    },
    computed: {
        ...mapState('productStatus', [
            'code',
            'isDefaultStatus',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('productStatus', [
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.code} - Product statuses - Ergonode`,
        };
    },
};
</script>
