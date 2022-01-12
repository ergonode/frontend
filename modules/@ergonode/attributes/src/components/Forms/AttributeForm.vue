/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Attributes.attribute.components.AttributeForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
        :errors-presentation-mapper="errorMapper"
        @proceed="onProceed"
        @submit="onSubmit">
        <template #body>
            <FormSection>
                <Select
                    :data-cy="dataCyGenerator(typeFieldKey)"
                    :value="type"
                    required
                    :label="$t('@Attributes.attribute.components.AttributeForm.typeLabel')"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    :options="attributeTypeOptions"
                    :error-messages="errors[typeFieldKey]"
                    @input="onTypeChange" />
            </FormSection>
            <template v-if="type">
                <FormSection>
                    <TextField
                        :data-cy="dataCyGenerator(codeFieldKey)"
                        :value="code"
                        required
                        :error-messages="errors[codeFieldKey]"
                        :disabled="isDisabled || !isAllowedToUpdate"
                        :label="$t('@Attributes.attribute.components.AttributeForm.nameLabel')"
                        :hint="$t('@Attributes.attribute.components.AttributeForm.nameHint')"
                        @input="setCodeValue" />
                </FormSection>
                <FormSection :title="$t('@Attributes.attribute.components.AttributeForm.sectionTitle')">
                    <Select
                        :data-cy="dataCyGenerator(scopeFieldKey)"
                        :value="attributeScope"
                        required
                        :label="$t('@Attributes.attribute.components.AttributeForm.scopeLabel')"
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
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SCOPE,
} from '@Attributes/defaults';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    getKeyByValue,
    isObject,
} from '@Core/models/objectWrapper';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('attribute', [
            'id',
            'code',
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
            return this.$extendedForm({
                key: '@Attributes/components/Forms/AttributeForm',
                type: this.typeKey,
            });
        },
        scopeHint() {
            return this.$t('@Attributes.attribute.components.AttributeForm.scopeHint', {
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
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.create,
            ]));
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
        scopeFieldKey() {
            return 'scope';
        },
    },
    methods: {
        ...mapActions('attribute', [
            '__setState',
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
        errorMapper(errors) {
            return Object.keys(errors).reduce((acc, key) => {
                const tmpObject = acc;

                if (isObject(errors[key])) {
                    tmpObject[key] = Object.values(errors[key]).join(' ');
                } else {
                    tmpObject[key] = errors[key];
                }

                return tmpObject;
            }, {});
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
