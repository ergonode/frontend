/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryTreePage :title="code" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
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
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Category tree hasn`t been fetched properly',
                });
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
    },
    head() {
        return {
            title: `${this.code} - Category trees - Ergonode`,
        };
    },
};
</script>
