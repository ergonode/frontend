/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CollectionPage
        :title="code"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { MODAL_TYPE } from '@Core/defaults/modals';
import { mapActions, mapState } from 'vuex';

const updateCollectionProduct = () => import('@Collections/services/updateCollectionProduct.service');

export default {
    name: 'EditCollection',
    components: {
        CollectionPage: () => import('@Collections/components/Pages/CollectionPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({ store, params }) {
        await store.dispatch('collections/getCollectionById', {
            collectionId: params.id,
        });
    },
    computed: {
        ...mapState('collections', {
            id: state => state.id,
            code: state => state.code,
            type: state => state.type,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
    },
    methods: {
        ...mapActions('collections', [
            'updateCollection',
            'removeCollection',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this collection?',
                confirmCallback: () => this.removeCollection({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onSave() {
            this.removeValidationErrors();
            const { name, description } = this.translations;
            const data = { typeId: this.type, name, description };

            updateCollectionProduct().then(response => response.default({
                $axios: this.$axios,
                $store: this.$store,
            }));

            this.updateCollection({
                id: this.id,
                data,
                onSuccess: this.onUpdateCollectionSuccess,
                onError: this.onError,
            });
        },
        onUpdateCollectionSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product collection updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Product collection removed' });
            this.$router.push({ name: 'collections-grid' });
        },
    },
    head() {
        return {
            title: `${this.code} - Collections - Ergonode`,
        };
    },
};
</script>
