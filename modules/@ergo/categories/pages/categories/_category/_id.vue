/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
        :title="code"
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '@Core/models/mappers/translationsMapper';
import { getParentRoutePath } from '@Core/models/navigation/tabs';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'EditCategory',
    components: {
        CategoryPage: () => import('@Categories/components/Pages/CategoryPage'),
    },
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
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
    computed: {
        ...mapState('categories', {
            id: state => state.id,
            code: state => state.code,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('categories', [
            'updateCategory',
            'removeCategory',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirmed = confirm('Are you sure you want to delete this category?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirmed) {
                this.removeCategory({
                    onSuccess: this.onRemoveSuccess,
                });
            }
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
        onUpdateCategorySuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Category updated' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Category removed' });
            this.$router.push({ name: 'categories-grid' });
        },
    },
    head() {
        return {
            title: `${this.code} - Categories - Ergonode`,
        };
    },
};
</script>
