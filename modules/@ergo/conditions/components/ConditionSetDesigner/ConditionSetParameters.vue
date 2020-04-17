/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FormValidatorField :field-key="paramFieldKeys">
        <template #validator="{ errorMessages }">
            <Component
                :is="getComponentViaType"
                :solid="true"
                :required="true"
                :clearable="true"
                :small="true"
                :label="parameter.name"
                :options="conditionOptions"
                :value="conditionValue"
                :multiselect="isConditionTypeMultiSelect"
                :error-messages="errorMessages"
                @input="setConditionValueByType" />
        </template>
    </FormValidatorField>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { TYPES } from '@Conditions/defaults/conditions';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';

export default {
    name: 'ConditionSetParameters',
    components: {
        FormValidatorField,
    },
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
    data() {
        return {
            affectedByOptionId: null,
        };
    },
    computed: {
        ...mapState('conditions', {
            conditionsValues: state => state.conditionsValues,
        }),
        isConditionTypeMultiSelect() {
            return this.parameter.type === TYPES.MULTI_SELECT;
        },
        getComponentViaType() {
            switch (this.parameter.type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('@Core/components/Inputs/Select/TranslationSelect');
            case TYPES.TEXT:
            case TYPES.UNIT:
            case TYPES.NUMERIC:
                return () => import('@Core/components/Inputs/TextField');
            default:
                return null;
            }
        },
        conditionValue() {
            const { name } = this.parameter;

            if (!this.conditionsValues[this.itemId] || !this.conditionsValues[this.itemId][name]) {
                if (this.isConditionTypeMultiSelect) return [];
                return '';
            }

            return this.conditionsValues[this.itemId][name];
        },
        conditionOptions() {
            if (this.parameter.complexOptions) {
                const options = this.parameter.complexOptions[this.affectedByOptionId];

                return options
                    ? Object.keys(options).map(key => ({
                        id: key, key, value: options[key],
                    }))
                    : [];
            }
            return this.parameter.options
                ? Object.keys(this.parameter.options).map(key => ({
                    id: key, key, value: this.parameter.options[key],
                }))
                : [];
        },
        paramFieldKeys() {
            return [`conditions_element-${this.itemRow}`, this.parameter.name];
        },
    },
    watch: {
        conditionsValues: {
            deep: true,
            immediate: true,
            handler(value) {
                if (this.parameter.affectedBy && value[this.itemId]) {
                    if (value[this.itemId][this.parameter.affectedBy]) {
                        const selectedValue = value[this.itemId][this.parameter.affectedBy].id;

                        this.affectedByOptionId = selectedValue || null;
                    }
                }
            },
        },
    },
    methods: {
        ...mapActions('conditions', [
            'setConditionValue',
        ]),
        setConditionValueByType(value) {
            const { name } = this.parameter;

            this.setConditionValue({
                conditionId: this.itemId,
                parameterName: name,
                parameterValue: value,
            });
        },
    },
};
</script>
