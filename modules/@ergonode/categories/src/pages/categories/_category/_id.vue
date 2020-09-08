/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
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
    name: 'EditCategory',
    components: {
        CategoryPage: () => import('@Categories/components/Pages/CategoryPage'),
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
        await store.dispatch('category/getCategory', params);
    },
    computed: {
        ...mapState('category', {
            id: state => state.id,
            code: state => state.code,
        }),
    },
    methods: {
        ...mapActions('category', [
            'removeCategory',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this category?',
                confirmCallback: () => this.removeCategory({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category removed',
            });
            this.$router.push({
                name: 'categories-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Categories - Ergonode`,
        };
    },
};
</script>
