/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :data-cy="dataCyGenerator('params')"
        key="attrHasParams"
        :value="value"
        required
        :label="paramsLabel"
        :options="attributeParametersOptions"
        :error-messages="errorMessage"
        :disabled="disabled"
        @input="setParameterValue" />
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'AttributeFormParamsSelect',
    mixins: [
        formFeedbackMixin,
    ],
    props: {
        typeKey: {
            type: String,
            default: '',
        },
        getParams: {
            type: Function,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        value() {
            return this.$store.state.attribute[this.parameterData.fieldName];
        },
        paramsLabel() {
            return toCapitalize(this.parameterData.translation);
        },
        params() {
            return this.parameterData.value;
        },
        attributeParametersOptions() {
            // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
            if (Array.isArray(this.params)) {
                return this.params.map(data => data.name);
            }
            return Object.values(this.params);
        },
        paramsFieldKey() {
            return 'parameters';
        },
        parameterData() {
            return this.getParams(this).params;
        },
        errorMessage() {
            const error = this.errors[this.paramsFieldKey];

            return error ? error[this.parameterData.key] : null;
        },
    },
    watch: {
        typeKey() {
            this.__setState({
                key: this.parameterData.fieldName,
                value: null,
            });
        },
    },
    beforeDestroy() {
        this.__setState({
            key: this.parameterData.fieldName,
            value: null,
        });
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        setParameterValue(value = null) {
            this.__setState({
                key: this.parameterData.fieldName,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.paramsFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
    },
};
</script>
