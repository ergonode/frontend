/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ProductPage
        :title="sku"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    PRODUCT_TYPE,
} from '@Products/defaults';
import {
    mapActions,
    mapState,
} from 'vuex';

const applyProductDraft = () => import('@Products/services/applyProductDraft.service');

export default {
    name: 'ProductEdit',
    components: {
        ProductPage: () => import('@Products/components/Pages/ProductPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store,
        params,
    }) {
        const {
            defaultLanguageCodeByPrivileges,
        } = store.state.core;
        const {
            id,
        } = params;

        await Promise.all([
            store.dispatch('product/getProductDraft', {
                languageCode: defaultLanguageCodeByPrivileges,
                id,
            }),
            store.dispatch('product/getProduct', id),
        ]);
    },
    computed: {
        ...mapState('product', {
            id: state => state.id,
            sku: state => state.sku,
            type: state => state.type,
            template: state => state.template,
            categories: state => state.categories,
            bindingAttributesIds: state => state.bindingAttributesIds,
        }),
        ...mapState('dictionaries', {
            productTypes: state => state.productTypes,
        }),
    },
    destroyed() {
        this.__clearStorage();
    },
    methods: {
        ...mapActions('product', [
            'updateProduct',
            'removeProduct',
            '__clearStorage',
        ]),
        onDraftAppliedSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product updated',
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product removed',
            });
            this.$router.push({
                name: 'catalog-products',
            });
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this product?',
                confirmCallback: () => this.removeProduct({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        async onSave() {
            const {
                params: {
                    id,
                },
            } = this.$route;
            const data = {
                templateId: this.template,
                categoryIds: this.categories,
            };

            if (getKeyByValue(this.productTypes, this.type) === PRODUCT_TYPE.WITH_VARIANTS) {
                data.bindings = this.bindingAttributesIds;
            }

            await this.$setLoader('footerButton');
            await this.updateProduct({
                id,
                data,
            });
            await applyProductDraft()
                .then(request => request
                    .default({
                        $axios: this.$axios,
                        $store: this.$store,
                        id,
                    })
                    .then(this.onDraftAppliedSuccess));
            await this.$removeLoader('footerButton');
        },
    },
    head() {
        return {
            title: `${this.sku} - Products - Ergonode`,
        };
    },
};
</script>
