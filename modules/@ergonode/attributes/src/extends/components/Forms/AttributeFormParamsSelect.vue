/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Select
        :data-cy="dataCyGenerator('params')"
        key="attrHasParams"
        :value="parameter"
        required
        :label="paramsLabel"
        :options="attributeParametersOptions"
        :error-messages="errorMessages[paramsFieldKey]"
        :disabled="!isAllowedToUpdate"
        @input="setParameterValue" />
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    typesConfiguration,
} from '@Attributes/models/attributeTypes';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeFormParamsSelect',
    components: {
        Select: () => import('@Core/components/Inputs/Select/Select'),
    },
    props: {
        errorMessages: {
            type: Object,
            default: () => ({}),
        },
        typeKey: {
            type: String,
            default: '',
        },
        dupa: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            typesConfig: typesConfiguration.call(this),
        };
    },
    computed: {
        ...mapState('attribute', {
            attrID: state => state.id,
            parameter: state => state.parameter,
        }),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        paramsLabel() {
            const paramsKey = this.typesConfig.getParamsKeyForType(this.typeKey);

            return toCapitalize(paramsKey);
        },
        params() {
            return this.typesConfig.getParamsOptionsForType(this.typeKey);
        },
        attributeParametersOptions() {
            // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
            if (Array.isArray(this.params)) {
                return this.params.map(data => data.name);
            }
            return Object.values(this.params);
        },
        paramsFieldKey() {
            return `parameters_${this.paramsLabel.toLowerCase()}`;
        },
    },
    watch: {
        typeKey: {
            immediate: true,
            handler() {
                this.setParameterValue();
            },
        },
    },
    created() {
        this.$emit('fieldKeys', [
            this.paramsFieldKey,
        ]);
    },
    beforeDestroy() {
        this.setParameterValue();
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        setParameterValue(value = null) {
            this.__setState({
                key: 'parameter',
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
    },
};
</script>
