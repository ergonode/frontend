/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResourcePage
        :title="`${name}.${extension}`"
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
import ResourcePage from '@Media/components/Pages/ResourcePage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ResourceEdit',
    components: {
        ResourcePage,
    },
    mixins: [
        beforeLeavePageMixin,
    ],
    asyncData({
        store, params,
    }) {
        return store.dispatch('media/getResource', params);
    },
    computed: {
        ...mapState('media', [
            'name',
            'extension',
        ]),
    },
    beforeDestroy() {
        this.__clearStorage();
        this.__clearTranslationsStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('media', [
            'removeResource',
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
                message: 'Are you sure you want to delete this resource?',
                confirmCallback: () => this.removeResource({
                    onSuccess: this.onRemoveResourceSuccess,
                }),
            });
        },
        onRemoveResourceSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Resource removed',
            });
            this.$router.push({
                name: 'media-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.name} - Media - Ergonode`,
        };
    },
};
</script>
