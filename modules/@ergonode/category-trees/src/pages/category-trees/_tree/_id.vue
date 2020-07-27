/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        :title="code"
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
    getMappedTreeData,
} from '@Trees/models/treeMapper';
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
        await Promise.all([
            store.dispatch('tree/__clearStorage'),
            store.dispatch('translations/__clearStorage'),
        ]);
        await store.dispatch('tree/getTreeById', {
            treeId: params.id,
        });
    },
    computed: {
        ...mapState('tree', {
            treeId: state => state.treeId,
            code: state => state.code,
        }),
        ...mapState('gridDesigner', {
            fullGridData: state => state.fullGridData,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    destroyed() {
        this.clearGridDesignerStorage();
    },
    methods: {
        ...mapActions('tree', [
            'updateTree',
            'removeCategoryTree',
        ]),
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: '__clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this tree?',
                confirmCallback: () => this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                }),
            });
        },
        onSave() {
            const {
                name,
            } = this.translations;
            const data = {
                name,
                categories: getMappedTreeData(this.fullGridData),
            };

            this.updateTree({
                id: this.treeId,
                data,
                onSuccess: this.onUpdateSuccess,
                onError: this.onError,
            });
        },
        onUpdateSuccess() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Tree updated',
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
