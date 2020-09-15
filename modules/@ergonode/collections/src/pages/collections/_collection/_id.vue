/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CollectionPage
        :title="code"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditCollection',
    components: {
        CollectionPage: () => import('@Collections/components/Pages/CollectionPage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('collection/getCollection', params);
    },
    computed: {
        ...mapState('collection', {
            code: state => state.code,
        }),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.clearTranslationsStorage();
        this.removeErrors();
    },
    methods: {
        ...mapActions('collection', [
            'removeCollection',
            '__clearStorage',
        ]),
        ...mapActions('validations', [
            'removeErrors',
        ]),
        ...mapActions('tab', {
            clearTranslationsStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this collection?',
                confirmCallback: () => this.removeCollection({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Product collection removed',
            });
            this.$router.push({
                name: 'collections-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Collections - Ergonode`,
        };
    },
};
</script>
