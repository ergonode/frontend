/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Roles.role.components.UserRoleForm.title')"
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
                    :data-cy="dataCyGenerator(nameFieldKey)"
                    :value="name"
                    required
                    :label="$t('@Roles.role.components.UserRoleForm.nameLabel')"
                    :hint="$t('@Roles.role.components.UserRoleForm.nameHint')"
                    :error-messages="errors[nameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setNameValue" />
                <TextArea
                    :data-cy="dataCyGenerator(descriptionFieldKey)"
                    :value="description"
                    :label="$t('@Roles.role.components.UserRoleForm.descLabel')"
                    resize="none"
                    height="150px"
                    :error-messages="errors[descriptionFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setDescriptionValue" />
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
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Roles/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserRoleForm',
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('role', [
            'id',
            'name',
            'description',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Roles/components/Forms/UserRoleForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.USER_ROLE.create,
            ]));
        },
        descriptionFieldKey() {
            return 'description';
        },
        nameFieldKey() {
            return 'name';
        },
    },
    methods: {
        ...mapActions('role', [
            '__setState',
        ]),
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
        onSubmit() {
            this.$emit('submit');
        },
        setNameValue(value) {
            this.__setState({
                key: this.nameFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.nameFieldKey,
                value,
            });
        },
        setDescriptionValue(value) {
            this.__setState({
                key: this.descriptionFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.descriptionFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `role-${key}`;
        },
    },
};
</script>
