/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
        :title="title"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, clearEmptyTranslations } from '~/model/mappers/translationMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditCategory',
    middleware: ['tab/redirectToCategoryGeneral'],
    components: {
        CategoryPage: () => import('~/components/Pages/CategoryPage'),
    },
    data: () => ({
        title: 'Edit category',
    }),
    computed: {
        ...mapState('categories', {
            id: state => state.id,
            name: state => state.name,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('categories', [
            'updateCategory',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/categories');
        },
        onUpdateCategorySuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Category updated' });
            this.$router.push('/categories');
        },
        onSave() {
            this.removeValidationErrors();
            let { name } = this.translations;
            if (isThereAnyTranslation(name)) {
                name = clearEmptyTranslations(name);
            }
            this.updateCategory({
                id: this.id,
                data: { name },
                onSuccess: this.onUpdateCategorySuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({
        store,
        params,
        error,
    }) {
        await store.dispatch('translations/clearStorage');
        await store.dispatch('categories/clearStorage');
        await store.dispatch('categories/getCategoryById', {
            categoryId: params.id,
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return error();
            },
        });
    },
};
</script>
