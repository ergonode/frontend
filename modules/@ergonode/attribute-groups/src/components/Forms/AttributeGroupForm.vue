/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@AttributeGroups.attributeGroup.components.AttributeGroupForm.title')"
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
                    :label="$t('@AttributeGroups.attributeGroup.components.AttributeGroupForm.nameLabel')"
                    :hint="$t('@AttributeGroups.attributeGroup.components.AttributeGroupForm.nameHint')"
                    @input="setCodeValue" />
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
import PRIVILEGES from '@AttributeGroups/config/privileges';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributeGroupForm',
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
                key: '@AttributeGroups/components/Forms/AttributeGroupForm',
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
