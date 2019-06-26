/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
        :title="title"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NewCategory',
    middleware: ['tab/redirectToCategoryGeneral'],
    components: {
        CategoryPage: () => import('~/components/Pages/CategoryPage'),
    },
    data: () => ({
        title: 'New Category',
    }),
    computed: {
        ...mapState('categories', {
            code: state => state.code,
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
            this.$router.push('/categories');
        },
        onCreateCategorySuccess(id) {
            this.removeValidationErrors();
            this.$addAlert(this.$store, { type: 'success', message: 'Category created' });
            this.$router.push({
                name: 'categories-edit-id',
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
