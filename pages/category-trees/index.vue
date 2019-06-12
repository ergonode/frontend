/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreesPage
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
        CategoryTreesPage: () => import('~/components/Pages/CategoryTreesPage'),
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
        }),
        onCancel() {
            this.$router.back();
        },
        onCreate() {
            // TODO: Adding a function body when the tree designer is ready
        },
    },
    async fetch({ store, error }) {
        const {
            user: { language: userLanguageCode },
        } = store.state.authentication;

        await store.dispatch('tree/clearStorage');
        await store.dispatch('tree/getTreeById', {
            treeId: 'c5500df0-4861-47ec-aaaa-6716fcf356d4',
            onError: (err) => {
                if (err.response && err.response.status === 404) {
                    return error({ statusCode: 404, message: err.message });
                }
                return error();
            },
        });

        await store.dispatch('list/clearStorage');
        await store.dispatch('list/getElementsForGroup', {
            listType: 'categories',
            groupId: null,
            elementsCount: 9999,
            languageCode: userLanguageCode,
        });
    },
};
</script>
