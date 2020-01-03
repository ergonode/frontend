/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="getComponentViaType"
        :solid="true"
        :regular="true"
        :required="true"
        :clearable="true"
        :label="parameter.name"
        :options="conditionOptions"
        :value="conditionValue"
        :multiselect="parameter.type === 'MULTI_SELECT'"
        :disabled="!$hasAccess(['CONDITION_UPDATE'])"
        :error-messages="errorParamsMessage"
        @input="setConditionValueByType" />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { TYPES } from '~/defaults/conditions';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ConditionSetParameters',
    mixins: [errorValidationMixin],
    props: {
        parameter: {
            type: Object,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        itemRow: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapState('conditions', {
            conditionsValues: (state) => state.conditionsValues,
        }),
        getComponentViaType() {
            switch (this.parameter.type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('~/core/components/Inputs/Select/Select');
            case TYPES.TEXT:
            case TYPES.UNIT:
            case TYPES.NUMERIC:
                return () => import('~/core/components/Inputs/TextField');
            default:
                return null;
            }
        },
        conditionValue() {
            return this.conditionsValues[this.itemId]
                ? this.conditionsValues[this.itemId][this.parameter.name]
                : '';
        },
        conditionOptions() {
            return this.parameter.options ? Object.values(this.parameter.options) : [];
        },
        errorParamsMessage() {
            const { name } = this.parameter;
            const parametersIndex = `conditions_element-${this.itemRow}`;
            return this.conditionParametersAreValidate(parametersIndex, name) || null;
        },
    },
    methods: {
        ...mapActions('conditions', [
            'setConditionValue',
        ]),
        setConditionValueByType(value) {
            const tmpValue = value;
            const { name } = this.parameter;

            this.setConditionValue({
                conditionId: this.itemId,
                parameterName: name,
                parameterValue: tmpValue,
            });
        },
        conditionParametersAreValidate(index, key) {
            return this.validationErrorsAreNotNull
            && this.validationErrorsHasProperty(index)
            && this.validationErrors[index][key]
                ? this.validationErrors[index][key].join(', ') : null;
        },
    },
};
</script>
