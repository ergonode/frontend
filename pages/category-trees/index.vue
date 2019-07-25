/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreesPage
        :title="title"
        @save="onSave" />
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getMappedTreeData } from '~/model/mappers/treeMapper';

export default {
    name: 'NewCategoryTree',
    middleware: ['tab/redirectToCategoryTree'],
    components: {
        CategoryTreesPage: () => import('~/components/Pages/CategoryTreesPage'),
    },
    data() {
        return {
            title: 'Category tree',
        };
    },
    computed: {
        ...mapState('tree', {
            fullTreeData: state => state.fullTreeData,
            treeId: state => state.treeId,
        }),
    },
    created() {
        this.setConfigurationForList({
            draggedElementsStore: {
                storeName: 'tree',
                stateName: 'fullTreeData',
                idName: ['id'],
            },
        });
    },
    methods: {
        ...mapActions('tree', [
            'updateTree',
        ]),
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
        onUpdateTreeSuccess() {
            this.$addAlert(this.$store, { type: 'success', message: 'Tree updated' });
        },
        onSave() {
            const categoryTree = {
                name: 'default',
                categories: getMappedTreeData(this.fullTreeData),
            };
            this.updateTree({
                id: this.treeId,
                data: categoryTree,
                onSuccess: this.onUpdateTreeSuccess,
                onError: () => {},
            });
        },
    },
    async fetch({ store, error }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('list/clearStorage');
        await store.dispatch('list/getElementsForGroup', {
            listType: 'categories',
            groupId: null,
            elementsCount: 9999,
            languageCode: userLanguageCode,
        });
        await store.dispatch('tree/clearStorage');
        await store.dispatch('tree/getTreeById', {
            treeName: 'default',
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                console.log(err);
                return error();
            },
        });
    },
};
</script>
