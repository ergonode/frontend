/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="getComponentViaType"
        :required="true"
        :clearable="true"
        :size="smallSize"
        :label="parameter.name"
        :options="conditionOptions"
        :value="conditionValue"
        :multiselect="isConditionTypeMultiSelect"
        :error-messages="errorMessages"
        @input="setConditionValueByType" />
</template>
<script>
import {
    TYPES,
} from '@Conditions/defaults/conditionsDesigner';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetParameters',
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
        scope: {
            type: String,
            default: '',
        },
        errorMessages: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            affectedByOptionId: null,
        };
    },
    computed: {
        ...mapState('condition', [
            'conditionsValues',
        ]),
        smallSize() {
            return SIZE.SMALL;
        },
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
            const {
                name,
            } = this.parameter;

            if (!this.conditionsValues[this.itemId] || !this.conditionsValues[this.itemId][name]) {
                if (this.isConditionTypeMultiSelect) {
                    return [];
                }
                return '';
            }

            return this.conditionsValues[this.itemId][name];
        },
        conditionOptions() {
            if (this.parameter.complexOptions) {
                const options = this.parameter.complexOptions[this.affectedByOptionId];

                return options
                    ? Object.keys(options).map(key => ({
                        id: key,
                        key,
                        value: options[key],
                    }))
                    : [];
            }
            return this.parameter.options
                ? Object.keys(this.parameter.options).map(key => ({
                    id: key,
                    key,
                    value: this.parameter.options[key],
                }))
                : [];
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
        ...mapActions('condition', [
            'setConditionValue',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        setConditionValueByType(value) {
            const {
                name,
            } = this.parameter;

            this.setConditionValue({
                conditionId: this.itemId,
                parameterName: name,
                parameterValue: value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: `${this.itemId}|${name}`,
                value,
            });
        },
    },
};
</script>
