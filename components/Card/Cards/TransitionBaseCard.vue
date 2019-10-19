/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <Select
            :value="source"
            solid
            regular
            required
            label="Source"
            :options="statuses"
            :disabled="isDisabled || isDisabledByPrivileges"
            :error-messages="errorSourceMessage"
            @input="onSetSource" />
        <Select
            :value="destination"
            solid
            regular
            required
            label="Destination"
            :options="statuses"
            :disabled="isDisabled || isDisabledByPrivileges"
            :error-messages="errorDestinationMessage"
            @input="onSetDestination" />
        <Select
            :value="parsedConditionSet"
            solid
            regular
            label="Condition set"
            :options="conditionSetsValues"
            :disabled="isDisabledByPrivileges"
            :error-messages="errorConditionSetIdMessage"
            @input="onSetConditionSetId" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getValueByKey, getKeyByValue, isEmpty } from '~/model/objectWrapper';
import BaseCard from '~/components/Card/BaseCard';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'TransitionBaseCard',
    components: {
        BaseCard,
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('transitions', {
            source: (state) => state.source,
            destination: (state) => state.destination,
            conditionSetId: (state) => state.conditionSetId,
        }),
        ...mapState('conditions', {
            conditionSets: (state) => state.conditionSets,
        }),
        ...mapState('productStatus', {
            statuses: (state) => state.statuses,
        }),
        isDisabled() {
            if (!isEmpty(this.$route.params)) {
                const { source, destination } = this.$route.params;
                return Boolean(source) && Boolean(destination);
            }
            return false;
        },
        conditionSetsValues() {
            return Object.values(this.conditionSets);
        },
        parsedConditionSet() {
            return getValueByKey(this.conditionSets, this.conditionSetId);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess('WORKFLOW_UPDATE'))
            || (!this.isDisabled && !this.$hasAccess('WORKFLOW_CREATE'));
        },
        errorConditionSetIdMessage() {
            const conditionIdIndex = 'condition_set';
            return this.elementIsValidate(conditionIdIndex);
        },
        errorSourceMessage() {
            const sourceIndex = 'source';
            return this.elementIsValidate(sourceIndex);
        },
        errorDestinationMessage() {
            const destinationIndex = 'destination';
            return this.elementIsValidate(destinationIndex);
        },
    },
    methods: {
        ...mapActions('transitions', [
            'setSource',
            'setDestination',
            'setConditionSetId',
        ]),
        ...mapActions('validations', [
            'setErrorForKey',
        ]),
        onSetConditionSetId(conditionSet) {
            this.setConditionSetId(getKeyByValue(this.conditionSets, conditionSet));
        },
        onSetSource(source) {
            let value = source;
            if (source === this.destination) {
                value = null;
                this.setErrorForKey({ key: 'source', error: ['Source must be different then destination'] });
            }
            this.setSource(value);
        },
        onSetDestination(destination) {
            let value = destination;
            if (destination === this.source) {
                value = null;
                this.setErrorForKey({ key: 'destination', error: ['Destination must be different then source'] });
            }
            this.setDestination(value);
        },
    },
};
</script>
