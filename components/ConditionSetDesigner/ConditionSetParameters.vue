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
        :options="hasOptions ? getConditionOptions : []"
        :value="getConditionValue"
        :multiselect="parameter.type === 'MULTI_SELECT'"
        :disabled="!$hasAccess(['CONDITION_UPDATE'])"
        :error-messages="errorParamsMessage"
        @input="setConditionValueByType" />
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    getValueByKey,
    getValuesByKeys,
} from '@Core/models/objectWrapper';
import { hasOptions } from '~/model/conditions/ConditionTypes';
import { TYPES } from '~/defaults/conditions';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import TextField from '@Core/components/Inputs/TextField';
import Select from '@Core/components/Inputs/Select/Select';

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
            return hasOptions(this.parameter.type);
        },
        getComponentViaType() {
            switch (this.parameter.type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return Select;
            case TYPES.TEXT:
            case TYPES.UNIT:
            case TYPES.NUMERIC:
                return TextField;
            default:
                return null;
            }
        },
        getConditionOptions() {
            const options = Object.keys(this.parameter.options);

            return options.map((option) => ({
                id: option,
                name: this.parameter.options[option],
            }));
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
