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

export default {
    validate({ params }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    name: 'EditCategoryTree',
    middleware: ['tab/redirectToCategoryTreesGeneral'],
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
        ...mapActions('list', ['setConfigurationForList']),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/category-trees');
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
            this.$router.push('/category-trees/grid');
        },
        onRemoveSuccess() {
            this.$addAlert({ type: 'success', message: 'Category tree removed' });
            this.$router.push('/category-trees/grid');
        },
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('gridDesigner/clearStorage');
        await store.dispatch('list/clearStorage');
        await store.dispatch('tree/clearStorage');
        await store.dispatch('translations/clearStorage');
        await store.dispatch('list/getElementsForGroup', {
            listType: 'categories',
            groupId: null,
            elementsCount: 9999,
            languageCode: userLanguageCode,
        });
        await store.dispatch('tree/getTreeById', {
            treeId: params.id,
        });
    },
};
</script>
