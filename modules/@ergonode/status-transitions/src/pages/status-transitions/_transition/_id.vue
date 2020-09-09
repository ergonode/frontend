/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage
        :title="`${params[0]} -> ${params[1]}`"
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
    name: 'TransitionEdit',
    components: {
        TransitionPage: () => import('@Transitions/components/Pages/TransitionPage'),
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('productStatus/getProductStatuses');
        await store.dispatch('statusTransition/getTransition', params);
    },
    computed: {
        ...mapState('statusTransition', {
            source: state => state.source,
            destination: state => state.destination,
        }),
        params() {
            const {
                id,
            } = this.$route.params;
            return id.split('--');
        },
    },
    beforeDestroy() {
        this.clearTransitionStorage();
        this.clearConditionSetStorage();
    },
    methods: {
        ...mapActions('condition', {
            clearConditionSetStorage: '__clearStorage',
        }),
        ...mapActions('statusTransition', {
            removeTransition: 'removeTransition',
            clearTransitionStorage: '__clearStorage',
        }),
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this transition?',
                confirmCallback: () => this.removeTransition({
                    onSuccess: this.onRemoveTransitionSuccess,
                }),
            });
        },
        onRemoveTransitionSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Transition removed',
            });
            this.$router.push({
                name: 'status-transitions-grid',
            });
        },
    },
    head() {
        return {
            title: `${this.params[0]} -> ${this.params[1]} - Status transitions - Ergonode`,
        };
    },
};
</script>
