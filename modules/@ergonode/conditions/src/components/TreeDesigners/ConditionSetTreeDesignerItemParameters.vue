/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Component
        :is="typeComponent"
        :required="true"
        :clearable="true"
        :size="smallSize"
        :label="parameter.name"
        :options="options"
        :value="conditionValue"
        :multiselect="isConditionTypeMultiSelect"
        :error-messages="errorMessages"
        @input="setConditionValueByType" />
</template>
<script>
import {
    TYPES,
} from '@Conditions/defaults/treeDesigner';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ConditionSetTreeDesignerItemParameters',
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
        typeComponent() {
            switch (this.parameter.type) {
            case TYPES.SELECT:
            case TYPES.MULTI_SELECT:
                return () => import('@UI/components/Select/TranslationSelect');
            case TYPES.TEXT:
            case TYPES.UNIT:
            case TYPES.NUMERIC:
                return () => import('@UI/components/TextField/TextField');
            default:
                return null;
            }
        },
        conditionValue() {
            const {
                name,
            } = this.parameter;

            if (!(this.conditionsValues[this.itemId] && this.conditionsValues[this.itemId][name])) {
                if (this.isConditionTypeMultiSelect) {
                    return [];
                }
                return '';
            }

            return this.conditionsValues[this.itemId][name];
        },
        options() {
            const {
                complexOptions = {},
                affectedBy = '',
            } = this.parameter;

            let options = this.parameter.options || {};

            if (affectedBy) {
                if (this.conditionsValues[this.itemId]
                    && this.conditionsValues[this.itemId][affectedBy]) {
                    const affectedByValue = this.conditionsValues[this.itemId][affectedBy];

                    if (complexOptions[affectedByValue.id]) {
                        options = complexOptions[affectedByValue.id];
                    }
                }
            }

            return Object.keys(options).map(key => ({
                id: key,
                key,
                value: options[key],
            }));
        },
        isConditionTypeMultiSelect() {
            return this.parameter.type === TYPES.MULTI_SELECT;
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
