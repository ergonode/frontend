/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage
        title="New Transition"
        @dismiss="onDismiss"
        @create="onCreate" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getParentRoutePath } from '~/model/navigation/tabs';

export default {
    name: 'TransitionNew',
    components: {
        TransitionPage: () => import('~/components/Pages/TransitionPage'),
    },
    created() {
        this.clearStorage();
    },
    computed: {
        ...mapState('productStatus', {
            statuses: (state) => state.statuses,
        }),
        ...mapState('transitions', {
            source: (state) => state.source,
            destination: (state) => state.destination,
            roles: (state) => state.roles,
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
            const transition = {
                source: this.source.key,
                destination: this.destination.key,
                roles: this.roles.map((role) => role.key),
            };

            this.removeValidationErrors();
            this.createTransition({
                data: transition,
                onSuccess: this.onTransitionCreated,
                onError: this.onError,
            });
        },
        onDismiss() {
            this.$router.push(getParentRoutePath(this.$route));
        },
        onTransitionCreated() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Transition created' });
            this.$router.push({
                name: 'transition-edit-id-general',
                params: {
                    id: `${this.source.key}--${this.destination.key}`,
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
            store.dispatch('roles/getRoles', {
                limit: 9999,
                offset: 0,
            }),
        ]);
    },
};
</script>
