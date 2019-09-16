/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['condition', {'condition--loader': !isCondition}]">
        <template v-if="isCondition">
            <div
                class="condition__parameters"
                :style="setParametersStyle">
                <Component
                    :is="getComponentViaType(element.type)"
                    v-for="(element, index) in condition.parameters"
                    :key="index"
                    solid
                    required
                    clearable
                    :label="element.name"
                    :options="hasOptions(element.type, element.options)"
                    :value="getConditionValue(element)"
                    :multiselect="element.type === 'MULTI_SELECT'"
                    :disabled="!$hasAccess('SEGMENT_UPDATE')"
                    :error-messages="errorParamsMessage(element.name) || null"
                    @input="(value) => setConditionValueByType({ ...element, value })"
                />
            </div>
            <span
                class="condition__phrase typo-label txt--graphite"
                v-text="conditionPhrase" />
        </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import {
    isEmpty,
    getKeyByValue,
    getValueByKey,
    getKeysByValues,
    getValuesByKeys,
} from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import TextField from '~/components/Inputs/TextField';
import Select from '~/components/Inputs/Select/Select';

export default {
    name: 'ConditionSetItem',
    mixins: [errorValidationMixin],
    props: {
        condition: {
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
            conditionsValues: state => state.conditionsValues,
        }),
        setParametersStyle() {
            const { parameters } = this.condition;
            return {
                gridTemplateColumns: `repeat(${parameters.length}, 1fr)`,
            };
        },
        isCondition() {
            return !isEmpty(this.condition);
        },
        conditionPhrase() {
            const { phrase, parameters } = this.condition;
            const placeholders = this.conditionsValues[this.itemId];

            if (!placeholders) return phrase;
            return phrase.replace(/\[\w+\]/g, (placeholder) => {
                const clearedKey = placeholder.slice(1).slice(0, -1);
                const x = parameters.findIndex(p => p.name === clearedKey
                    && (p.type === 'SELECT' || p.type === 'MULTI_SELECT'));
                if (x !== -1) {
                    return Array.isArray(placeholders[clearedKey])
                        ? getValuesByKeys(parameters[x].options, placeholders[clearedKey])
                        : getValueByKey(parameters[x].options, placeholders[clearedKey]);
                }
                return placeholders[clearedKey] || placeholder;
            });
        },
    },
    methods: {
        ...mapActions('conditions', [
            'setConditionValue',
        ]),
        getComponentViaType(type) {
            switch (type) {
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
        hasOptions(type, options = {}) {
            return type === 'SELECT' || type === 'MULTI_SELECT'
                ? Object.values(options)
                : [];
        },
        setConditionValueByType({
            value, name, type, options,
        }) {
            let tmpValue = value;
            if (type === 'SELECT' || type === 'MULTI_SELECT') {
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
        getConditionValue({ name, type, options }) {
            const condition = this.conditionsValues[this.itemId];

            if (!condition) return '';
            if (type === 'SELECT' || type === 'MULTI_SELECT') {
                return Array.isArray(condition[name])
                    ? getValuesByKeys(options, condition[name])
                    : getValueByKey(options, condition[name]);
            }
            return condition[name] || '';
        },
        conditionParametersAreValidate(index, key) {
            return this.validationErrorsAreNotNull
            && this.validationErrorsHasProperty(index)
            && this.validationErrors[index][key]
                ? this.validationErrors[index][key].join(', ') : null;
        },
        errorParamsMessage(key) {
            const parametersIndex = `conditions_element-${this.itemRow}`;
            return this.conditionParametersAreValidate(parametersIndex, key);
        },
    },
};
</script>

<style lang="scss" scoped>
    .condition {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid $grey;
        background-color: $background;
        cursor: move;
        overflow: hidden;

        &::after {
            position: absolute;
            left: 50%;
            bottom: -8px;
            padding: 0 8px;
            transform: translateX(-50%);
            background-color: $white;
            color: $lightGraphite;
            content: "AND";
        }

        &--loader {
            border: 1px dashed $primary;
            background-color: $lightGreen;
        }

        &__parameters {
            display: grid;
            grid-template-rows: 1fr;
            flex: 0 1 100%;
            padding: 4px 0 8px;
            background-color: $white;

            & > div {
                padding: 0 15%;
            }
        }

        &__phrase {
            padding: 6px 8px;
            border-top: 1px dashed $lightGrey;
            letter-spacing: 1px;
            color: $lightGraphite;
        }
    }
</style>
