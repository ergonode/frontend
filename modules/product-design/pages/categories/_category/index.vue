/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
        title="New Category"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    name: 'NewCategory',
    components: {
        CategoryPage: () => import('~/components/Pages/CategoryPage'),
    },
    computed: {
        ...mapState('categories', {
            code: (state) => state.code,
        }),
    },
    created() {
        this.clearStorage();
    },
    methods: {
        ...mapActions('categories', [
            'createCategory',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onCreateCategorySuccess(id) {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Category created' });
            this.$router.push({
                name: 'category-edit-id-general',
                params: {
                    id,
                },
            });
        },
        onCreate() {
            this.removeValidationErrors();
            const category = {
                code: this.code,
            };
            this.createCategory({
                data: category,
                onSuccess: this.onCreateCategorySuccess,
                onError: this.onError,
            });
        },
    },
};
</script>
