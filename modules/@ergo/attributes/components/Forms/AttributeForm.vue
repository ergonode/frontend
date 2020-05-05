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
            paramsFieldKey,
            ...optionsFieldKeys,
        ]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
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
            <template v-if="isMultilingual || hasParams">
                <Divider />
                <FormSection title="Configuration">
                    <Toggler
                        v-if="isMultilingual"
                        key="attrMultilingual"
                        :value="multilingual"
                        :disabled="isDisabled || isDisabledByPrivileges"
                        label="Multilingual attribute"
                        @input="setMultilingualAttribute">
                        <template #append>
                            <InfoHint :hint="multilingualHint" />
                        </template>
                    </Toggler>
                    <Select
                        v-if="hasParams"
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
        </template>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toCapitalize } from '@Core/models/stringWrapper';
import { getKeyByValue } from '@Core/models/objectWrapper';
import {
    hasParams, hasOptions, isMultilingual, getParamsKeyForType, getParamsOptionsForType,
} from '@Attributes/models/attributeTypes';

export default {
    name: 'AttributeForm',
    components: {
        AttributeOptionKeyValues: () => import('@Attributes/components/Forms/Sections/AttributeOptionKeyValues'),
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
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
            multilingual: state => state.isMultilingual,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        multilingualHint() {
            return 'Multilingual attribute is an attribute which has translations, by deselecting it attribute is going to display same values for each language.';
        },
        paramsLabel() {
            const paramsKey = getParamsKeyForType(this.typeKey);

            return toCapitalize(paramsKey);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isMultilingual() {
            return isMultilingual(this.typeKey);
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
            'setMultilingualAttribute',
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
