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
            ...optionsFieldKeys,
            ...extendedFieldKeys,
        ]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errorMessages[codeFieldKey]"
                    :disabled="isDisabled || isDisabledByPrivileges"
                    label="System name"
                    hint="Attribute code must be unique"
                    @input="setCodeValue" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(groupsFieldKey)"
                    :value="groups"
                    label="Groups"
                    :multiselect="true"
                    :clearable="true"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[groupsFieldKey]"
                    :fetch-options-request="getAttributeGroupOptionsRequest"
                    @input="setGroupsValue" />
                <Select
                    :data-cy="dataCyGenerator(typeFieldKey)"
                    :value="type"
                    required
                    label="Type"
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
                    required
                    label="Scope"
                    :disabled="isDisabledByPrivileges"
                    :options="attributeScopeOptions"
                    :error-messages="errorMessages[scopeFieldKey]"
                    @input="setScopeValue">
                    <template #append>
                        <InfoHint :hint="scopeHint" />
                    </template>
                </Select>
                <Component
                    :is="formComponent.component"
                    :type-key="typeKey"
                    :error-messages="errorMessages"
                    v-bind="formComponent.props"
                    @fieldKeys="onFieldKeys" />
                <AttributeOptionKeyValues
                    v-show="hasOptions"
                    key="attrHasOptions"
                    :disabled="isDisabledByPrivileges" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    SCOPE,
} from '@Attributes/defaults/attributes';
import {
    typesConfiguration,
} from '@Attributes/models/attributeTypes';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

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
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
        Divider: () => import('@Core/components/Dividers/Divider'),
    },
    data() {
        return {
            typesConfig: typesConfiguration.call(this),
            extendedFieldKeys: [],
        };
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
            scope: state => state.scope,
        }),
        ...mapState('dictionaries', {
            attrTypes: state => state.attrTypes,
        }),
        ...mapGetters('core', [
            'getRootOnLanguagesTree',
        ]),
        formComponent() {
            const extendedComponents = this.$getExtendedComponents('@Attributes/components/Forms/AttributeForm');

            if (extendedComponents && extendedComponents[this.typeKey]) {
                return extendedComponents[this.typeKey];
            }

            return {};
        },
        scopeHint() {
            return `Global means the same attribute values for each language, inherited from the root language (${this.getRootOnLanguagesTree.name}). Option values can be translated, but cannot be changed in the product template.`;
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isDisabled() {
            return Boolean(this.attrID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess([
                'ATTRIBUTE_UPDATE',
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                'ATTRIBUTE_CREATE',
            ]));
        },
        hasOptions() {
            return this.typesConfig.hasOptions(this.typeKey);
        },
        attributeTypeOptions() {
            return Object.values(this.attrTypes).sort();
        },
        attributeScopeOptions() {
            return Object.values(SCOPE);
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
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
            'removeAttributeOptions',
        ]),
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });
        },
        setScopeValue(value) {
            this.__setState({
                key: 'scope',
                value,
            });
        },
        setGroupsValue(value) {
            this.__setState({
                key: 'groups',
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: 'type',
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
        getAttributeGroupOptionsRequest() {
            return getAttributeGroupsOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
        onTypeChange(type) {
            this.setTypeValue(type);

            if (!this.hasOptions) {
                this.removeAttributeOptions();
            }
        },
        onFieldKeys(fields) {
            this.extendedFieldKeys = fields;
        },
    },
};
</script>
