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
            :disabled="isDisabledByPrivileges"
            :error-messages="errorSourceMessage"
            @input="setSource" />
        <Select
            :value="destination"
            solid
            regular
            required
            label="Destination"
            :options="statuses"
            :disabled="isDisabledByPrivileges"
            :error-messages="errorDestinationMessage"
            @input="setDestination" />
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
import { getValueByKey, getKeyByValue } from '~/model/objectWrapper';
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
            transitionId: (state) => state.id,
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
            return Boolean(this.transitionId);
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
        onSetConditionSetId(conditionSet) {
            this.setConditionSetId(getKeyByValue(this.conditionSets, conditionSet));
        },
    },
};
</script>
