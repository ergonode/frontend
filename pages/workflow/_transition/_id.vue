/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage
        title="Transition"
        is-edit
        @dismiss="onDismiss"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isThereAnyTranslation, getParsedTranslations } from '~/model/mappers/translationsMapper';

export default {
    validate({ params }) {
        return /\w--\w/.test(params.id);
    },
    name: 'TransitionEdit',
    middleware: ['tab/redirectToTransitionGeneral'],
    components: {
        TransitionPage: () => import('~/components/Pages/TransitionPage'),
    },
    computed: {
        ...mapState('transitions', {
            source: (state) => state.source,
            destination: (state) => state.destination,
            conditionSetId: (state) => state.conditionSetId,
        }),
        ...mapState('translations', {
            translations: (state) => state.translations,
        }),
    },
    methods: {
        ...mapActions('transitions', [
            'updateTransition',
            'removeTransition',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onSave() {
            this.removeValidationErrors();
            const propertiesToUpdate = {
                condition_set: this.conditionSetId,
            };
            const { name, description } = this.translations;

            if (isThereAnyTranslation(name)) {
                propertiesToUpdate.name = getParsedTranslations(name);
            }
            if (isThereAnyTranslation(description)) {
                propertiesToUpdate.description = getParsedTranslations(description);
            }
            this.updateTransition({
                data: propertiesToUpdate,
                onSuccess: this.onTransitionUpdated,
                onError: this.onError,
            });
        },
        onDismiss() {
            this.$router.push('/workflow/transitions');
        },
        onRemove() {
            const isConfirm = confirm('Are you sure you want to delete this transition?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                this.removeTransition({
                    onSuccess: this.onRemoveTransitionSuccess,
                });
            }
        },
        onRemoveTransitionSuccess() {
            this.$addAlert({ type: 'success', message: 'Transition removed' });
            this.$router.push('/workflow/transitions');
        },
        onTransitionUpdated() {
            this.removeValidationErrors();
            this.$addAlert({ type: 'success', message: 'Transition updated' });
            this.$router.push('/workflow/transitions');
        },
    },
    async fetch({
        store, params,
    }) {
        await store.dispatch('translations/clearStorage');
        await store.dispatch('transitions/clearStorage');
        await store.dispatch('conditions/getConditionSets', {
            limit: 9999,
            offset: 0,
        });
        await store.dispatch('productStatus/getProductStatuses', {
            limit: 9999,
            offset: 0,
        });
        await store.dispatch('transitions/getTransitionById', {
            transitionId: params.id,
        });
    },
};
</script>
