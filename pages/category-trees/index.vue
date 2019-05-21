/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TreePage
        :title="title"
        :buttons="buttons"
        icon="sprite-menu menu-tree--selected" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'NewCategoryTree',
    middleware: ['tab/redirectToCategoryTree'],
    components: {
        TreePage: () => import('~/components/Pages/TreePage'),
    },
    data() {
        return {
            title: 'Category tree',
            buttons: [
                // uncomment when we create removal options
                // {
                //     title: 'REMOVE TREE',
                //     color: 'transparent',
                //     theme: 'dark',
                //     icon: 'sprite-system system-trash--deactive',
                //     action: this.onCancel,
                // },
            ],
        };
    },
    created() {
        this.setConfigurationForList({
            elementsAreMultiDraggable: false,
            isListMultilingual: false,
            draggedElementsStore: {
                storeName: 'tree',
                stateName: 'treeData',
                idName: ['id'],
            },
        });
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
            clearStorageList: 'clearStorage',
        }),
        onCancel() {
            this.$router.back();
        },
        onCreate() {
            // TODO: Adding a function body when the tree designer is ready
        },
    },
    async fetch({ store, error }) {
        const treeRequest = store.dispatch('tree/getTreeById', {
            treeId: 'c5500df0-4861-47ec-aaaa-6716fcf356d4',
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return error();
            },
        });
        const listElementsRequest = store.dispatch('list/getElementsForGroup', {
            listType: 'categories',
            groupId: null,
            elementsCount: 9999,
            languageCode: store.state.authentication.user.language,
            onSuccess: () => {},
            onError: () => {},
        });

        await store.dispatch('list/clearStorage');

        return Promise.all([
            treeRequest,
            listElementsRequest,
        ]);
    },
};
</script>
