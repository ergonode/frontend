/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditCategory',
    middleware: ['tab/redirectToCategoryGeneral'],
    components: {
        CategoryPage: () => import('~/components/Pages/CategoryPage'),
    },
    computed: {
        ...mapState('categories', {
            id: (state) => state.id,
            code: (state) => state.code,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
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
                name = getParsedTranslations(name);
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
    }) {
        await Promise.all([
            store.dispatch('translations/clearStorage'),
            store.dispatch('categories/clearStorage'),
        ]);
        await store.dispatch('categories/getCategoryById', {
            categoryId: params.id,
        });
    },
};
</script>
