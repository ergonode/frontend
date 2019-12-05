/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        title="New Tree"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    name: 'NewCategoryTree',
    components: {
        CategoryTreePage: () => import('~/components/Pages/CategoryTreePage'),
    },
    computed: {
        ...mapState('tree', {
            code: (state) => state.code,
        }),
    },
    created() {
        this.clearStorage();
        this.clearDesignerStorage();
    },
    methods: {
        ...mapActions('tree', [
            'createTree',
            'clearStorage',
        ]),
        ...mapActions('gridDesigner', {
            clearDesignerStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onCreateCategoryTreeSuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Category tree created' });
            this.$router.push({
                name: 'category-tree-edit-id',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const tree = {
                code: this.code,
            };
            this.createTree({
                data: tree,
                onSuccess: this.onCreateCategoryTreeSuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
