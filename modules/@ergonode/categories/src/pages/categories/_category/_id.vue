/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CategoryPage
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
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditCategory',
    components: {
        CategoryPage: () => import('@Categories/components/Pages/CategoryPage'),
    },
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
            'removeCategory',
            '__clearStorage',
        ]),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
        ...mapActions('tab', {
            __clearTranslationsStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: this.$t('category.messages.deleteConfirm'),
                confirmCallback: () => {
                    this.removeCategory({
                        onSuccess: this.onRemoveSuccess,
                        onError: this.onRemoveError,
                    });
                },
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('category.messages.deleteSuccess'),
            });
            this.$router.push({
                name: 'categories-grid',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('category.errors.deleteRequest'),
            });
        },
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('category.page.title')}`,
        };
    },
};
</script>
