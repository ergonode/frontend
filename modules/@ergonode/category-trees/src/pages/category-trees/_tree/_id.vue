/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage
        :title="code"
        @remove="onRemove" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import CategoryTreePage from '@Trees/components/Pages/CategoryTreePage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditCategoryTree',
    components: {
        CategoryTreePage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    validate({
        params,
    }) {
        return /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/.test(params.id);
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('categoryTree/getCategoryTree', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: 'Category tree hasn`t been fetched properly',
                    });
                }
            },
        });
    },
    computed: {
        ...mapState('categoryTree', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.__clearGridDesignerStorage();
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('categoryTree', [
            'removeCategoryTree',
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
        ...mapActions('gridDesigner', {
            __clearGridDesignerStorage: '__clearStorage',
        }),
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: 'Are you sure you want to delete this tree?',
                applyTitle: 'YES, REMOVE',
                action: () => this.removeCategoryTree({
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                }),
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Category tree removed',
            });
            this.$router.push({
                name: 'category-trees-grid',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: 'Catgory tree hasn`t been deleted',
            });
        },
    },
    head() {
        return {
            title: `${this.code} - Category trees - Ergonode`,
        };
    },
};
</script>
