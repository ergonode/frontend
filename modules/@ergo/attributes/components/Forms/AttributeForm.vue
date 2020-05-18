/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
        :fields-keys="[
            codeFieldKey,
            typeFieldKey,
            groupsFieldKey,
            scopeFieldKey,
            paramsFieldKey,
            ...optionsFieldKeys,
        ]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    data-cy="attributeName"
                    :value="code"
                    solid
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    regular
                    label="System name"
                    hint="Attribute code must be unique"
                    @input="setAttributeCode" />
                <TranslationSelect
                    data-cy="attributeGroup"
                    :value="groups"
                    label="Groups"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    :options="groupOptions"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[groupsFieldKey]"
                    @input="setAttributeGroups" />
                <Select
                    data-cy="attributeType"
                    :value="type"
                    solid
                    required
                    label="Type"
                    regular
                    :disabled="isDisabled || isDisabledByPrivileges"
                    :options="attributeTypeOptions"
                    :error-messages="errorMessages[typeFieldKey]"
                    @input="onTypeChange" />
            </FormSection>
            <Divider />
            <FormSection title="Configuration">
                <Select
                    data-cy="attributeScope"
                    :value="scope"
                    solid
                    required
                    label="Scope"
                    regular
                    :disabled="isDisabledByPrivileges"
                    :options="attributeScopeOptions"
                    :error-messages="errorMessages[scopeFieldKey]"
                    @input="setAttributeScope">
                    <template #append>
                        <InfoHint :hint="scopeHint" />
                    </template>
                </Select>
                <Select
                    v-if="hasParams"
                    data-cy="attributeParams"
                    key="attrHasParams"
                    :value="parameter"
                    solid
                    required
                    regular
                    :label="paramsLabel"
                    :options="attributeParametersOptions"
                    :error-messages="errorMessages[paramsFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="setAttributeParameter" />
                <AttributeOptionKeyValues
                    v-show="hasOptions"
                    key="attrHasOptions"
                    :disabled="isDisabledByPrivileges" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SCOPE } from '@Attributes/defaults/attributes';
import { toCapitalize } from '@Core/models/stringWrapper';
import { getKeyByValue } from '@Core/models/objectWrapper';
import {
    hasParams, hasOptions, getParamsKeyForType, getParamsOptionsForType,
} from '@Attributes/models/attributeTypes';

export default {
    name: 'AttributeForm',
    components: {
        AttributeOptionKeyValues: () => import('@Attributes/components/Forms/Sections/AttributeOptionKeyValues'),
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        TranslationSelect: () => import('@Core/components/Inputs/Select/TranslationSelect'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: state => state.user.language,
        }),
        ...mapState('attribute', {
            attrID: state => state.id,
            code: state => state.code,
            options: state => state.options,
            groups: state => state.groups,
            groupOptions: state => state.groupOptions,
            type: state => state.type,
            parameter: state => state.parameter,
            scope: state => state.scope,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        scopeHint() {
            return 'Scope';
        },
        paramsLabel() {
            const paramsKey = getParamsKeyForType(this.typeKey);

            return toCapitalize(paramsKey);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['ATTRIBUTE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['ATTRIBUTE_CREATE']));
        },
        hasParams() {
            return hasParams(this.typeKey);
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        params() {
            return getParamsOptionsForType(
                this.typeKey,
                this.$store.state.dictionaries,
            );
        },
        hasOptions() {
            return hasOptions(this.typeKey);
        },
        attributeTypeOptions() {
            return Object.values(this.attrTypes);
        },
        attributeScopeOptions() {
            return Object.values(SCOPE);
        },
        attributeParametersOptions() {
            // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
            if (Array.isArray(this.params)) {
                return this.params.map(data => data.name);
            }
            return Object.values(this.params);
        },
        optionsFieldKeys() {
            return Object.keys(this.options).map(key => `code_${key}`);
        },
        codeFieldKey() {
            return 'code';
        },
        typeFieldKey() {
            return 'type';
        },
        groupsFieldKey() {
            return 'groups';
        },
        scopeFieldKey() {
            return 'scope';
        },
        paramsFieldKey() {
            return `parameters_${this.paramsLabel.toLowerCase()}`;
        },
    },
    methods: {
        ...mapActions('attribute', [
            'setAttributeCode',
            'setAttributeGroups',
            'setAttributeType',
            'setAttributeParameter',
            'setAttributeScope',
            'removeAttributeOptions',
            'clearStorage',
        ]),
        onTypeChange(type) {
            this.setAttributeType(type);
            this.setAttributeParameter();

            if (!this.hasOptions) {
                this.removeAttributeOptions();
            }
        },
    },
};
</script>
