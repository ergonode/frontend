/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResourcePage
        :title="`${name}.${extension}`"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
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
    asyncData({
        store, params,
    }) {
        return store.dispatch('media/getResource', params.id);
    },
    computed: {
        ...mapState('media', {
            name: state => state.name,
            extension: state => state.extension,
        }),
    },
    methods: {
        ...mapActions('media', [
            'removeResource',
            'updateResource',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this resource?',
                confirmCallback: () => this.removeResource({
                    onSuccess: this.onRemoveResourceSuccess,
                }),
            });
        },
        onSave() {
            this.updateResource({
                onSuccess: this.onResourceUpdated,
                onError: this.onError,
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
        onResourceUpdated() {
            this.removeValidationErrors();
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Resource updated',
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
