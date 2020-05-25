/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <TransitionPage
        :title="`${params[0]} -> ${params[1]}`"
        @remove="onRemove"
        @save="onSave" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getMappedConditionSetData } from '@Conditions/models/conditionSetMapper';
import { ALERT_TYPE } from '@Core/defaults/alerts';

export default {
    name: 'TransitionEdit',
    components: {
        TransitionPage: () => import('@Transitions/components/Pages/TransitionPage'),
    },
    async fetch({
        store, params,
    }) {
        await Promise.all([
            store.dispatch('transitions/clearStorage'),
            store.dispatch('productStatus/getProductStatuses', {
                limit: 9999,
                offset: 0,
            }),
        ]);
        await store.dispatch('transitions/getTransitionById', params);
    },
    computed: {
        ...mapState('transitions', {
            source: state => state.source,
            destination: state => state.destination,
            roles: state => state.roles,
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('conditions', {
            conditionsValues: state => state.conditionsValues,
            conditions: state => state.conditions,
        }),
        params() {
            const { id } = this.$route.params;
            return id.split('--');
        },
    },
    beforeDestroy() {
        this.clearTransitionStorage();
        this.clearConditionSetStorage();
    },
    methods: {
        ...mapActions('conditions', {
            createConditionSet: 'createConditionSet',
            updateConditionSet: 'updateConditionSet',
            clearConditionSetStorage: 'clearStorage',
        }),
        ...mapActions('transitions', {
            updateTransition: 'updateTransition',
            removeTransition: 'removeTransition',
            clearTransitionStorage: 'clearStorage',
        }),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        onSave() {
            const propertiesToUpdate = {
                conditions: getMappedConditionSetData(this.conditionsValues, this.conditions),
            };

            this.removeValidationErrors();
            if (!this.conditionSetId) {
                this.createConditionSet({
                    data: propertiesToUpdate,
                    onSuccess: this.onConditionCreated,
                    onError: this.onError,
                });
            } else {
                this.updateConditionSet({
                    id: this.conditionSetId,
                    data: propertiesToUpdate,
                    onSuccess: () => {
                        this.updateTransition({
                            data: {
                                roles: this.roles,
                            },
                            onSuccess: this.onTransitionUpdated,
                            onError: this.onError,
                        });
                    },
                    onError: this.onError,
                });
            }
        },
        onConditionCreated(conditionSetId) {
            const propertiesToUpdate = {
                condition_set: conditionSetId,
                roles: this.roles,
            };

            this.updateTransition({
                data: propertiesToUpdate,
                onSuccess: this.onTransitionUpdated,
                onError: this.onError,
            });
        },
        onRemove() {
            const isConfirmed = confirm('Are you sure you want to delete this transition?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirmed) {
                this.removeTransition({
                    onSuccess: this.onRemoveTransitionSuccess,
                });
            }
        },
        onTransitionUpdated() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Transition updated' });
        },
        onRemoveTransitionSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Transition removed' });
            this.$router.push({ name: 'status-transitions-grid' });
        },
    },
    head() {
        return {
            title: `${this.params[0]} -> ${this.params[1]} - Status transitions - Ergonode`,
        };
    },
};
</script>
