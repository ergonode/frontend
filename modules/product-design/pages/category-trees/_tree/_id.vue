/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        :title="code"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedTreeData } from '~/model/mappers/treeMapper';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditCategoryTree',
    components: {
        CategoryTreePage: () => import('~/components/Pages/CategoryTreePage'),
    },
    computed: {
        ...mapState('tree', {
            treeId: (state) => state.treeId,
            code: (state) => state.code,
        }),
        ...mapState('gridDesigner', {
            fullGridData: (state) => state.fullGridData,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
    },
    methods: {
        ...mapActions('tree', [
            'updateTree',
            'removeCategoryTree',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this category tree?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                });
            }
        },
        onSave() {
            let { name } = this.translations;
            if (isThereAnyTranslation(name)) {
                name = getParsedTranslations(name);
            }
            this.updateTree({
                id: this.treeId,
                data: {
                    name,
                    categories: getMappedTreeData(this.fullGridData),
                },
                onSuccess: this.onUpdateSuccess,
                onError: this.onError,
            });
        },
        onUpdateSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Tree updated' });
            this.$router.push({ name: 'category-trees' });
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Category tree removed' });
            this.$router.push({ name: 'category-trees' });
        },
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await Promise.all([
            store.dispatch('gridDesigner/clearStorage'),
            store.dispatch('list/clearStorage'),
            store.dispatch('tree/clearStorage'),
            store.dispatch('translations/clearStorage'),
            store.dispatch('list/getElements', {
                listType: 'categories',
                languageCode: userLanguageCode,
            }),
        ]);
        await store.dispatch('tree/getTreeById', {
            treeId: params.id,
        });
    },
};
</script>
