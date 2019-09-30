/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="code"
            solid
            regular
            required
            label="Code"
            :disabled="isDisabled || isDisabledByPrivileges"
            :error-messages="errorCodeMessage"
            hint="Code must be unique"
            @input="setCode"
        />
        <Select
            :value="parsedConditionSet"
            solid
            regular
            required
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
    name: 'SegmentsBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    computed: {
        ...mapState('segments', {
            segmentId: state => state.id,
            code: state => state.code,
            conditionSetId: state => state.conditionSetId,
        }),
        ...mapState('conditions', {
            conditionSets: state => state.conditionSets,
        }),
        isDisabled() {
            return Boolean(this.segmentId);
        },
        conditionSetsValues() {
            return Object.values(this.conditionSets);
        },
        parsedConditionSet() {
            return getValueByKey(this.conditionSets, this.conditionSetId);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess('SEGMENT_UPDATE'))
            || (!this.isDisabled && !this.$hasAccess('SEGMENT_CREATE'));
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
        errorConditionSetIdMessage() {
            const conditionIdIndex = 'condition_set_id';
            return this.elementIsValidate(conditionIdIndex);
        },
    },
    methods: {
        ...mapActions('segments', [
            'setCode',
            'setConditionSetId',
        ]),
        onSetConditionSetId(conditionSet) {
            this.setConditionSetId(getKeyByValue(this.conditionSets, conditionSet));
        },
    },
};
</script>
