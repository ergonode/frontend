/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage :title="code" />
</template>

<script>
import CategoryPage from '@Categories/components/Pages/CategoryPage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditCategory',
    components: {
        CategoryPage,
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
        await store.dispatch('category/getCategory', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: app.i18n.t('category.errors.getRequest'),
                    });
                }
            },
        });
    },
    computed: {
        ...mapState('category', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('category', [
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('category.page.title')}`,
        };
    },
};
</script>
