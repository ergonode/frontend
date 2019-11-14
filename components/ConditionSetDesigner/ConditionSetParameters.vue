/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="getComponentViaType"
        solid
        regular
        required
        clearable
        :label="parameter.name"
        :options="hasOptions ? Object.values(parameter.options) : []"
        :value="getConditionValue"
        :multiselect="parameter.type === 'MULTI_SELECT'"
        :disabled="!$hasAccess('CONDITION_UPDATE')"
        :error-messages="errorParamsMessage"
        @input="setConditionValueByType" />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    getKeyByValue,
    getValueByKey,
    getKeysByValues,
    getValuesByKeys,
} from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import TextField from '~/components/Inputs/TextField';
import Select from '~/components/Inputs/Select/Select';

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
        hasOptions() {
            return this.parameter.options || false;
        },
        getComponentViaType() {
            switch (this.parameter.type) {
            case 'SELECT':
            case 'MULTI_SELECT':
                return Select;
            case 'NUMERIC':
            case 'TEXT':
            case 'UNIT':
            case 'PRICE':
                return TextField;
            default:
                return null;
            }
        },
        getConditionValue() {
            const { name, options } = this.parameter;
            const condition = this.conditionsValues[this.itemId];

            if (!condition) return '';
            if (this.hasOptions) {
                return Array.isArray(condition[name])
                    ? getValuesByKeys(options, condition[name])
                    : getValueByKey(options, condition[name]);
            }
            return condition[name] || '';
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
            let tmpValue = value;
            const { name, options } = this.parameter;
            if (this.hasOptions) {
                tmpValue = Array.isArray(value)
                    ? getKeysByValues(options, value)
                    : getKeyByValue(options, value) || null;
            }
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
