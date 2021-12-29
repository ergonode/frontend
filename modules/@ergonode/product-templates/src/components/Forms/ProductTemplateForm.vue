/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Templates.productTemplate.components.ProductTemplateForm.title')"
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
                    :label="$t('@Templates.productTemplate.components.ProductTemplateForm.codeLabel')"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setCodeValue" />
                <TextField
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="title"
                    required
                    :error-messages="errors[nameFieldKey]"
                    :label="$t('@Templates.productTemplate.components.ProductTemplateForm.nameLabel')"
                    :disabled="!isAllowedToUpdate"
                    @input="setTitleValue" />
            </FormSection>
            <template v-for="(field, index) in extendedForm">
                <Component
                    :is="field.component"
                    :key="index"
                    v-bind="bindingProps(field)" />
            </template>
        </template>
    </Form>
</template>

<script>
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Templates/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'ProductTemplateForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('productTemplate', [
            'id',
            'title',
            'code',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Templates/components/Forms/ProductTemplateForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.TEMPLATE_DESIGNER.create,
            ]));
        },
        codeFieldKey() {
            return 'code';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('productTemplate', [
            '__setState',
        ]),
        onSubmit() {
            this.$emit('submit');
        },
        setCodeValue(value) {
            this.__setState({
                key: 'code',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'code',
                value,
            });
        },
        setTitleValue(value) {
            this.__setState({
                key: 'title',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'title',
                value,
            });
        },
        dataCyGenerator(key) {
            return `template-${key}`;
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
