/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage :title="`${source.value} -> ${destination.value}`" />
</template>

<script>
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import TransitionPage from '@Transitions/components/Pages/TransitionPage';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'TransitionEdit',
    components: {
        TransitionPage,
    },
    async fetch({
        app,
        store,
        params,
    }) {
        await store.dispatch('productStatus/getProductStatuses', {});
        await store.dispatch('statusTransition/getStatusTransition', {
            id: params.id,
            onError: () => {
                app.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Transition hasn`t been fetched properly',
                });
            },
        });
    },
    computed: {
        ...mapState('statusTransition', [
            'source',
            'destination',
        ]),
        params() {
            const {
                id,
            } = this.$route.params;
            return id.split('--');
        },
    },
    beforeDestroy() {
        this.__clearTransitionStorage();
        this.__clearConditionStorage();
        this.__clearFeedbackStorage();
    },
    methods: {
        ...mapActions('condition', {
            __clearConditionStorage: '__clearStorage',
        }),
        ...mapActions('statusTransition', {
            __clearTransitionStorage: '__clearStorage',
        }),
        ...mapActions('feedback', {
            __clearFeedbackStorage: '__clearStorage',
        }),
    },
    head() {
        return {
            title: `${this.source.value} -> ${this.destination.value} - Status transitions - Ergonode`,
        };
    },
};
</script>
