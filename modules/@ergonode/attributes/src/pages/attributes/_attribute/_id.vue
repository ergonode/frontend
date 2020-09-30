/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AttributePage
        :title="code"
        @remove="onRemove" />
</template>

<script>
import AttributePage from '@Attributes/components/Pages/AttributePage';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import beforeLeavePageMixin from '@Core/mixins/page/beforeLeavePageMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'EditAttribute',
    components: {
        AttributePage,
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
        await store.dispatch('attribute/getAttribute', {
            id: params.id,
            onError: () => {
                if (process.client) {
                    app.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: app.i18n.t('attribute.errors.getRequest'),
                    });
                }
            },
        });
    },
    computed: {
        ...mapState('attribute', [
            'code',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('attribute', [
            'removeAttribute',
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
                message: this.$t('attribute.messages.deleteConfirm'),
                confirmCallback: () => {
                    this.removeAttribute({
                        onSuccess: this.onRemoveSuccess,
                        onError: this.onRemoveError,
                    });
                },
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: this.$t('attribute.messages.deleteSuccess'),
            });
            this.$router.push({
                name: 'attributes-grid',
            });
        },
        onRemoveError() {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: this.$t('attribute.errors.deleteRequest'),
            });
        },
    },
    head() {
        return {
            title: `${this.code} - ${this.$t('attribute.page.title')}`,
        };
    },
};
</script>
