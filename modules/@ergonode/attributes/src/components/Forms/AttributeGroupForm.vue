/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Attributes.attributeGroup.components.AttributeGroupForm.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
        :disabled="!isAllowedToUpdate"
        :errors="errors"
        :change-values="changeValues"
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
                    :label="$t('@Attributes.attributeGroup.components.AttributeGroupForm.nameLabel')"
                    :hint="$t('@Attributes.attributeGroup.components.AttributeGroupForm.nameHint')"
                    @input="setCodeValue" />
                <Divider v-if="extendedForm.length" />
                <template v-for="(field, index) in extendedForm">
                    <Component
                        :is="field.component"
                        :key="index"
                        v-bind="bindingProps(field)" />
                </template>
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeGroupForm',
    components: {
        Divider,
        Form,
        FormSection,
        TextField,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('attributeGroup', [
            'id',
            'code',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Attributes/components/Forms/AttributeGroupForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.ATTRIBUTE_GROUP.create,
            ]));
        },
        codeFieldKey() {
            return 'code';
        },
    },
    methods: {
        ...mapActions('attributeGroup', [
            '__setState',
        ]),
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
        dataCyGenerator(key) {
            return `attribute-group-${key}`;
        },
        bindingProps({
            props,
        }) {
            return {
                scope: this.scope,
                changeValues: this.changeValues,
                errors: this.errors,
                disabled: !this.isAllowedToUpdate,
                ...props,
            };
        },
    },
};
</script>
