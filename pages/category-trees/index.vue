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
import { mapDataToApi } from '~/model/mappers/treeMapper';

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
            treeData: state => state.treeData,
        }),
    },
    created() {
        this.setConfigurationForList({
            draggedElementsStore: {
                storeName: 'tree',
                stateName: 'treeData',
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
            const treeId = 'ed8121fd-e815-4f9e-ae8f-9c37615fb0f9';
            const categoryTree = {
                id: treeId,
                name: 'default',
                categories: mapDataToApi(this.treeData),
            };
            this.updateTree({
                id: treeId,
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
            treeId: 'ed8121fd-e815-4f9e-ae8f-9c37615fb0f9',
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
