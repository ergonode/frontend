/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
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
    name: 'EditCategoryTree',
    components: {
        CategoryTreePage: () => import('@Trees/components/Pages/CategoryTreePage'),
    },
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('categoryTree/getCategoryTree', params);
    },
    computed: {
        ...mapState('categoryTree', {
            code: state => state.code,
        }),
    },
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('categoryTree', [
            'removeCategoryTree',
        ]),
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this tree?',
                confirmCallback: () => this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree removed',
            });
            this.$router.push({
                name: 'category-trees-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Category trees - Ergonode`,
        };
    },
};
</script>
