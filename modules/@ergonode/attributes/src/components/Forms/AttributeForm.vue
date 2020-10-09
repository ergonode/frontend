/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('attribute.form.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :errors="errors"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <TextField
                    :data-cy="dataCyGenerator(codeFieldKey)"
                    :value="code"
                    required
                    :error-messages="errors[codeFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :label="$t('attribute.form.nameLabel')"
                    :hint="$t('attribute.form.nameHint')"
                    @input="setCodeValue" />
                <TranslationLazySelect
                    :data-cy="dataCyGenerator(groupsFieldKey)"
                    :value="groups"
                    :label="$t('attribute.form.groupLabel')"
                    :multiselect="true"
                    :clearable="true"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[groupsFieldKey]"
                    :fetch-options-request="getAttributeGroupsOptions"
                    @input="setGroupsValue" />
                <Select
                    :data-cy="dataCyGenerator(typeFieldKey)"
                    :value="type"
                    required
                    :label="$t('attribute.form.typeLabel')"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :options="attributeTypeOptions"
                    :error-messages="errors[typeFieldKey]"
                    @input="onTypeChange" />
            </FormSection>
            <Divider />
            <FormSection :title="$t('attribute.form.sectionTitle')">
                <Select
                    :data-cy="dataCyGenerator(scopeFieldKey)"
                    :value="attributeScope"
                    required
                    :label="$t('attribute.form.scopeLabel')"
                    :disabled="!isAllowedToUpdate"
                    :options="attributeScopeOptions"
                    :error-messages="errors[scopeFieldKey]"
                    @input="setScopeValue">
                    <template #append>
                        <InfoHint :hint="scopeHint" />
                    </template>
                </Select>
                <template v-for="(formComponent, index) in extendedForm">
                    <Component
                        :is="formComponent.component"
                        :key="index"
                        v-bind="bindingProps(formComponent)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SCOPE,
} from '@Attributes/defaults/attributes';
import Divider from '@Core/components/Dividers/Divider';
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import InfoHint from '@Core/components/Hints/InfoHint';
import Select from '@Core/components/Select/Select';
import TranslationLazySelect from '@Core/components/Select/TranslationLazySelect';
import TextField from '@Core/components/TextField/TextField';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import formFeedbackMixin from '@Core/mixins/form/formFeedbackMixin';
import {
    getKeyByValue,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeForm',
    components: {
        Form,
        FormSection,
        InfoHint,
        TextField,
        Select,
        TranslationLazySelect,
        Divider,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('attribute', [
            'id',
            'code',
            'groups',
            'type',
        ]),
        ...mapState('attribute', {
            attributeScope: state => state.scope,
        }),
        ...mapState('dictionaries', [
            'attrTypes',
        ]),
        ...mapGetters('core', [
            'rootLanguage',
        ]),
        extendedForm() {
            return this.$getExtendedFormByType({
                key: '@Attributes/components/Forms/AttributeForm',
                type: this.typeKey,
            });
        },
        scopeHint() {
            return this.$t('attribute.form.scopeHint', {
                lang: this.rootLanguage.name,
            });
        },
        typeKey() {
            return getKeyByValue(this.attrTypes, this.type);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        attributeTypeOptions() {
            return Object.values(this.attrTypes).sort();
        },
        attributeScopeOptions() {
            return Object.values(SCOPE);
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
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
        ]),
        ...mapActions('attributeGroup', [
            'getAttributeGroupsOptions',
        ]),
        bindingProps({
            props = {},
        }) {
            return {
                disabled: !this.isAllowedToUpdate,
                typeKey: this.typeKey,
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                ...props,
            };
        },
        setCodeValue(value) {
            this.__setState({
                key: this.codeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.codeFieldKey,
                value,
            });
        },
        setScopeValue(value) {
            this.__setState({
                key: this.scopeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.scopeFieldKey,
                value,
            });
        },
        setGroupsValue(value) {
            this.__setState({
                key: this.groupsFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.groupsFieldKey,
                value,
            });
        },
        setTypeValue(value) {
            this.__setState({
                key: this.typeFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.typeFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `attribute-${key}`;
        },
        onTypeChange(type) {
            this.setTypeValue(type);
        },
    },
};
</script>
