/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form>
        <FormGroup title="General options">
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
            <Select
                :value="groups"
                label="Groups"
                solid
                regular
                multiselect
                clearable
                is-list-element-hint
                :language-code="userLanguageCode"
                :options="groupOptions"
                :disabled="isDisabledByPrivileges"
                :error-messages="errorGroupsMessage"
                @input="setAttributeGroups" />
            <Select
                :value="type"
                solid
                required
                label="Type"
                regular
                :disabled="isDisabled || isDisabledByPrivileges"
                :options="attributeTypeOptions"
                :error-messages="errorTypeMessage"
                @input="onTypeChange" />
        </FormGroup>
        <FormGroup
            v-if="isMultilingual || hasParams"
            title="Configuration">
            <FadeGroupTransition>
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
                    :error-messages="errorParamsMessage"
                    :disabled="isDisabledByPrivileges"
                    @input="setAttributeParameter" />
                <AttributeOptionKeyValues
                    v-show="hasOptions"
                    key="attrHasOptions"
                    :disabled="isDisabledByPrivileges" />
            </FadeGroupTransition>
        </FormGroup>
    </Form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { toCapitalize } from '~/model/stringWrapper';
import {
    hasParams, hasOptions, isMultilingual, getParamsKeyForType, getParamsOptionsForType,
} from '~/model/attributes/AttributeTypes';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'AttributeForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormGroup: () => import('@Core/components/Form/FormGroup'),
        AttributeOptionKeyValues: () => import('~/components/Card/AttributeOptionKeyValues'),
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
        InfoHint: () => import('@Core/components/Hints/InfoHint'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        FadeGroupTransition: () => import('@Core/components/Transitions/FadeGroupTransition'),
    },
    mixins: [errorValidationMixin],
    data() {
        return {
            multilingualHint: 'Multilingual attribute is an attribute which has translations, by deselecting it attribute is going to display same values for each language.',
        };
    },
    computed: {
        ...mapState('authentication', {
            userLanguageCode: (state) => state.user.language,
        }),
        ...mapState('attribute', {
            attrID: (state) => state.id,
            code: (state) => state.code,
            groups: (state) => state.groups,
            groupOptions: (state) => state.groupOptions,
            type: (state) => state.type,
            parameter: (state) => state.parameter,
            multilingual: (state) => state.isMultilingual,
        }),
        ...mapState('data', {
            attrTypes: (state) => state.attrTypes,
        }),
        paramsLabel() {
            const paramsKey = getParamsKeyForType(this.type);

            return toCapitalize(paramsKey);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isMultilingual() {
            return isMultilingual(this.type);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess(['ATTRIBUTE_UPDATE']))
            || (!this.isDisabled && !this.$hasAccess(['ATTRIBUTE_CREATE']));
        },
        hasParams() {
            return hasParams(this.type);
        },
        params() {
            return getParamsOptionsForType(
                this.type,
                this.$store.state.data,
            );
        },
        hasOptions() {
            return hasOptions(this.type);
        },
        attributeTypeOptions() {
            return Object.keys(this.attrTypes).map((type) => ({
                id: type,
                name: this.attrTypes[type],
            }));
        },
        attributeParametersOptions() {
            return Object.keys(this.params).map((param) => ({
                id: param,
                name: this.params[param],
            }));
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
            this.setAttributeParameter();

            if (!this.hasOptions) {
                this.removeAttributeOptions();
            }
        },
    },
};
</script>
