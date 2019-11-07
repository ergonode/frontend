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
        }),
    },
    methods: {
        ...mapActions('transitions', [
            'createTransition',
            'clearStorage',
        ]),
        ...mapActions('conditions', [
            'createConditionSet',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onCreate() {
            this.removeValidationErrors();
            const condition = {
                code: `FROM_${this.source}_TO_${this.destination}`,
                // parent: 'workflow',
            };
            this.createConditionSet({
                data: condition,
                onSuccess: this.onCreateTransition,
                onError: () => {},
            });
        },
        onCreateTransition(id) {
            const transition = {
                source: this.source,
                destination: this.destination,
                condition_set: id,
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
                name: 'workflow-transition-edit-id-general',
                params: {
                    id: `${this.source}--${this.destination}`,
                },
            });
        },
    },
    async fetch({
        store,
    }) {
        await Promise.all([
            store.dispatch('productStatus/getProductStatuses', {
                limit: 9999,
                offset: 0,
            }),
        ]);
    },
};
</script>
