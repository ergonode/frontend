/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage
        title="New transition"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'TransitionNew',
    middleware: ['tab/redirectToTransitionGeneral'],
    components: {
        TransitionPage: () => import('~/components/Pages/TransitionPage'),
    },
    created() {
        this.clearStorage();
    },
    computed: {
        ...mapState('transitions', {
            source: (state) => state.source,
            destination: (state) => state.destination,
            conditionSetId: (state) => state.conditionSetId,
        }),
    },
    methods: {
        ...mapActions('transitions', [
            'createTransition',
            'clearStorage',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCreate() {
            this.removeValidationErrors();
            const transition = {
                source: this.source,
                destination: this.destination,
                condition_set: this.conditionSetId,
            };
            this.createTransition({
                data: transition,
                onSuccess: this.onTransitionCreated,
                onError: this.onError,
            });
        },
        onDismiss() {
            this.$router.push('/workflow/transitions');
        },
        onTransitionCreated() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Transition created' });
            this.$router.push({
                name: 'transition-edit-id',
                params: {
                    id: `${this.source}--${this.destination}`,
                },
            });
        },
    },
    async fetch({
        store,
    }) {
        await store.dispatch('conditions/getConditionSets', {
            limit: 9999,
            offset: 0,
        });
        await store.dispatch('productStatus/getProductStatuses', {
            limit: 9999,
            offset: 0,
        });
    },
};
</script>
