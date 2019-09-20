/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        :title="code"
        is-edit
        @dismiss="onDismiss"
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
            treeId: state => state.treeId,
            code: state => state.code,
            fullTreeData: state => state.fullTreeData,
        }),
        ...mapState('translations', {
            translations: state => state.translations,
        }),
    },
    methods: {
        ...mapActions('tree', ['updateTree']),
        ...mapActions('list', ['setConfigurationForList']),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onDismiss() {
            this.$router.push('/category-trees');
        },
        onUpdateTreeSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Tree updated' });
            this.$router.push('/category-trees');
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
                    categories: getMappedTreeData(this.fullTreeData),
                },
                onSuccess: this.onUpdateTreeSuccess,
                onError: this.onError,
            });
        },
    },
    async fetch({ store, params }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('translations/clearStorage');
        await store.dispatch('list/clearStorage');
        await store.dispatch('list/getElementsForGroup', {
            listType: 'categories',
            groupId: null,
            elementsCount: 9999,
            languageCode: userLanguageCode,
        });
        await store.dispatch('tree/clearStorage');
        await store.dispatch('tree/getTreeById', {
            treeId: params.id,
        });
    },
};
</script>
