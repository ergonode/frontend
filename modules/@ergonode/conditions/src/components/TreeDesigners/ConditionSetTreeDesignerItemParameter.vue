/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="typeComponent"
        :value="value[parameter.name]"
        :affected-by="value[parameter.affectedBy]"
        :parameter="parameter"
        :disabled="disabled"
        :error-messages="errorMessages"
        @input="onValueChange" />
</template>
<script>
import {
    capitalizeAndConcatenationArray,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesignerItemParameter',
    props: {
        parameter: {
            type: Object,
            required: true,
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        itemId: {
            type: String,
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState('condition', [
            'conditionsValues',
        ]),
        typeComponent() {
            const extendedParameters = this.$getExtendSlot('@Conditions/components/TreeDesigners/ConditionSetTreeDesignerItemParameter');

            if (extendedParameters && extendedParameters[this.parameter.type]) {
                return extendedParameters[this.parameter.type];
            }

            const componentName = `ConditionSetTreeDesigner${capitalizeAndConcatenationArray(this.parameter.type.split('_'))}ItemParameter`;

            return () => import(`@Conditions/components/TreeDesigners/ItemParameters/${componentName}`)
                .catch(() => import('@Conditions/components/TreeDesigners/ItemParameters/ConditionSetTreeDesignerNoTypeItemParameter'));
        },
    },
    methods: {
        ...mapActions('condition', [
            'setConditionValue',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onValueChange(value) {
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
