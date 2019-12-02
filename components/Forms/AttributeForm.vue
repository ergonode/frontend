/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup>
            <TextField
                :value="code"
                solid
                required
                :error-messages="errorCodeMessage"
                :disabled="isDisabled || isDisabledByPrivileges"
                regular
                label="Code"
                hint="Attribute code must be unique"
                @input="setAttributeCode" />
            <TranslationSelect
                :value="groups"
                :solid="true"
                :options="groupOptions"
                label="Groups"
                :regular="true"
                :multiselect="true"
                :clearable="true"
                :disabled="isDisabledByPrivileges"
                :error-messages="errorGroupsMessage"
                @input="setAttributeGroups" />
            <Divider />
            <Toggler
                :value="isMultilingual"
                :disabled="isDisabled || isDisabledByPrivileges"
                label="Multilingual attribute"
                @input="setMultilingualAttribute">
                <template #append>
                    <InfoHint :hint="multilingualHint" />
                </template>
            </Toggler>
            <Select
                :value="type"
                solid
                required
                label="Type"
                regular
                :disabled="isDisabled || isDisabledByPrivileges"
                :options="attrTypeValues"
                :error-messages="errorTypeMessage"
                @input="onTypeChange" />
            <Select
                v-if="hasParams"
                :value="parameter"
                solid
                required
                regular
                :multiselect="hasParamsWithMultiChoice"
                :label="paramsLabel"
                :options="attrParamValues"
                :error-messages="errorParamsMessage"
                :disabled="isDisabledByPrivileges"
                @input="(parameter) => setAttributeParameter(parameter)" />
            <AttributeOptionKeyValues
                v-show="hasOptions"
                :disabled="isDisabledByPrivileges" />
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toCapitalize } from '~/model/stringWrapper';
import { hasParams, hasOptions, getParamsOptionsForType } from '~/model/attributes/AttributeTypes';
import { getMappedParameterKey } from '~/model/mappers/attributeMapper';
import { getKeyByValue } from '~/model/objectWrapper';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'AttributeForm',
    components: {
        Form: () => import('~/core/components/Form/Form'),
        FormGroup: () => import('~/core/components/Form/FormGroup'),
        AttributeOptionKeyValues: () => import('~/components/Card/AttributeOptionKeyValues'),
        Toggler: () => import('~/core/components/Inputs/Toggler/Toggler'),
        InfoHint: () => import('~/core/components/Hints/InfoHint'),
        TextField: () => import('~/core/components/Inputs/TextField'),
        Select: () => import('~/core/components/Inputs/Select/Select'),
        TranslationSelect: () => import('~/core/components/Inputs/Select/TranslationSelect'),
        Divider: () => import('~/core/components/Dividers/Divider'),
    },
    mixins: [errorValidationMixin],
    data() {
        return {
            multilingualHint: 'Multilingual attribute is an attribute which has translations, by deselecting it attribute is going to display same values for each language.',
        };
    },
    computed: {
        ...mapState('attribute', {
            attrID: (state) => state.id,
            code: (state) => state.code,
            groups: (state) => state.groups,
            groupOptions: (state) => state.groupOptions,
            type: (state) => state.type,
            parameter: (state) => state.parameter,
            isMultilingual: (state) => state.isMultilingual,
        }),
        ...mapState('data', {
            attrTypes: (state) => state.attrTypes,
        }),
        paramsLabel() {
            const paramsKey = getMappedParameterKey(
                this.attrTypes,
                this.type,
            );

            return toCapitalize(paramsKey);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['ATTRIBUTE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['ATTRIBUTE_CREATE']));
        },
        currentTypeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        hasParamsWithMultiChoice() {
            return this.currentTypeKey === 'IMAGE';
        },
        hasParams() {
            return hasParams(this.currentTypeKey);
        },
        params() {
            return getParamsOptionsForType(
                this.currentTypeKey,
                this.$store.state.data,
            );
        },
        hasOptions() {
            return hasOptions(this.currentTypeKey);
        },
        attrTypeValues() {
            return Object.values(this.attrTypes);
        },
        attrParamValues() {
            return Array.isArray(this.params)
                ? this.params.map((param) => param.label)
                : Object.values(this.params);
        },
        errorCodeMessage() {
            const codeIndex = 'code';
            return this.elementIsValidate(codeIndex);
        },
        errorTypeMessage() {
            const typeIndex = 'type';
            return this.elementIsValidate(typeIndex);
        },
        errorGroupsMessage() {
            const groupsIndex = 'groups';
            return this.elementIsValidate(groupsIndex);
        },
        errorParamsMessage() {
            const parametersIndex = `parameters_${this.paramsLabel.toLowerCase()}`;
            return this.elementIsValidate(parametersIndex);
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setAttributeCode',
            'setAttributeGroups',
            'setAttributeType',
            'setAttributeParameter',
            'setMultilingualAttribute',
            'removeAttributeOptions',
            'clearStorage',
        ]),
        onTypeChange(type) {
            this.setAttributeType(type);

            // Clear chosen params
            if (this.hasParams) {
                this.setAttributeParameter('');
            }

            if (!this.hasOptions) {
                this.removeAttributeOptions();
            }
        },
    },
};
</script>
