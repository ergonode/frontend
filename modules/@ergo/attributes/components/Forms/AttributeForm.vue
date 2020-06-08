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
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    solid
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    regular
                    label="System name"
                    hint="Attribute code must be unique"
                    @input="setAttributeCode" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(groupsFieldKey)"
                    :value="groups"
                    label="Groups"
                    :solid="true"
                    :regular="true"
                    :multiselect="true"
                    :clearable="true"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[groupsFieldKey]"
                    :fetch-options-request="getAttributeGroupOptionsRequest"
                    @input="setAttributeGroups" />
                <Select
                    :data-cy="dataCyGenerator(typeFieldKey)"
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
                    :data-cy="dataCyGenerator(scopeFieldKey)"
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
                    :data-cy="dataCyGenerator('params')"
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
                <Toggler
                    v-if="isTextArea"
                    :value="parameter"
                    label="Rich text content disabled"
                    @input="setAttributeParameter" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { SCOPE, TYPES } from '@Attributes/defaults/attributes';
import { toCapitalize } from '@Core/models/stringWrapper';
import { getKeyByValue } from '@Core/models/objectWrapper';
import {
    hasParams, hasOptions, getParamsKeyForType, getParamsOptionsForType,
} from '@Attributes/models/attributeTypes';

const getAttributeGroupsOptions = () => import('@Attributes/services/getAttributeGroupsOptions.service');

export default {
    name: 'AttributeForm',
    components: {
        AttributeOptionKeyValues: () => import('@Attributes/components/Forms/Sections/AttributeOptionKeyValues'),
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
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
            type: state => state.type,
            parameter: state => state.parameter,
            scope: state => state.scope,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        ...mapGetters('core', [
            'getRootOnLanguagesTree',
        ]),
        scopeHint() {
            return `Global means the same attribute values for each language, inherited from the root language (${this.getRootOnLanguagesTree.name}). Option values can be translated, but cannot be changed in the product template.`;
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
        isTextArea() {
            return this.typeKey === TYPES.TEXT_AREA;
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
            return Object.values(this.attrTypes).sort();
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
            return 'group';
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
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
        getAttributeGroupOptionsRequest() {
            return getAttributeGroupsOptions().then(response => response.default(
                { $axios: this.$axios, $store: this.$store },
            ));
        },
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
