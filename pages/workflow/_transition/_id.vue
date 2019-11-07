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
import { getMappedConditionSetData } from '~/model/mappers/conditionSetMapper';
import { objectToArrayWithPropsName } from '~/model/objectWrapper';

export default {
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
        ...mapState('gridDesigner', {
            fullGridData: (state) => state.fullGridData,
        }),
        ...mapState('conditions', {
            conditionsValues: (state) => state.conditionsValues,
        }),
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearDesignerStorage: 'clearStorage',
        }),
        ...mapActions('conditions', {
            createConditionSet: 'createConditionSet',
            updateConditionSet: 'updateConditionSet',
            removeConditionSet: 'removeConditionSet',
            clearConditionSet: 'clearStorage',
        }),
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
            if (!this.conditionSetId) {
                const condition = {
                    code: `FROM_${this.source}_TO_${this.destination}`,
                    conditions: getMappedConditionSetData(this.fullGridData, this.conditionsValues),
                    // parent: 'segment',
                };
                console.log(condition);
                this.createConditionSet({
                    data: condition,
                    onSuccess: (id) => {
                        console.log(id);
                    },
                    onError: this.onError,
                });
            }
            console.log(this.conditionSetId);
            // this.updateTransition({
            //     data: { condition_set: this.conditionSetId },
            //     onSuccess: this.onTransitionUpdated,
            //     onError: this.onError,
            // });
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
    beforeDestroy() {
        this.clearConditionSet();
        this.clearDesignerStorage();
    },
    async fetch({
        store, params,
    }) {
        const { conditions } = store.state.data;
        const conditionsList = objectToArrayWithPropsName(conditions);
        await Promise.all([
            store.dispatch('transitions/clearStorage'),
            store.dispatch('productStatus/getProductStatuses', {
                limit: 9999,
                offset: 0,
            }),
            store.dispatch('gridDesigner/clearStorage'),
            store.dispatch('list/clearStorage'),
            store.dispatch('conditions/clearStorage'),
            store.dispatch('list/setElementsForLanguage', conditionsList),
        ]);

        await store.dispatch('transitions/getTransition', params);
    },
};
</script>
