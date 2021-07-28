/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('@Users.user.components.UserForm.title')"
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
                    :data-cy="dataCyGenerator(emailFieldKey)"
                    :value="email"
                    required
                    :label="$t('@Users.user.components.UserForm.emailLabel')"
                    :error-messages="errors[emailFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setEmailValue" />
                <TextField
                    :data-cy="dataCyGenerator(firstNameFieldKey)"
                    :value="firstName"
                    required
                    :label="$t('@Users.user.components.UserForm.nameLabel')"
                    :error-messages="errors[firstNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setFirstNameValue" />
                <TextField
                    :data-cy="dataCyGenerator(lastNameFieldKey)"
                    :value="lastName"
                    required
                    :label="$t('@Users.user.components.UserForm.lastNameLabel')"
                    :error-messages="errors[lastNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setLastNameValue" />
                <TextField
                    :data-cy="dataCyGenerator(passwordFieldKey)"
                    :value="password"
                    required
                    :label="$t('@Users.user.components.UserForm.passwordLabel')"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordValue" />
                <TextField
                    :data-cy="dataCyGenerator(passwordRepeatFieldKey)"
                    :value="passwordRepeat"
                    required
                    :label="$t('@Users.user.components.UserForm.passwordRepeatLabel')"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordRepeatFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordRepeatValue" />
                <Toggler
                    :data-cy="dataCyGenerator(isActiveFieldKey)"
                    :value="isActive"
                    :disabled="!isAllowedToUpdate"
                    :label="$t('@Users.user.components.UserForm.activeLabel')"
                    @input="setStatusValue" />
                <LanguageSelect
                    :data-cy="dataCyGenerator(languageFieldKey)"
                    :value="languageCode"
                    required
                    searchable
                    :label="$t('@Users.user.components.UserForm.languageLabel')"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[languageFieldKey]"
                    @input="setLanguageValue" />
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
import LanguageSelect from '@Core/components/Selects/LanguageSelect';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import CreateUserButton from '@Users/components/Buttons/CreateUserButton';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserForm',
    components: {
        LanguageSelect,
        CreateUserButton,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
    computed: {
        ...mapState('user', [
            'id',
            'email',
            'firstName',
            'lastName',
            'password',
            'passwordRepeat',
            'languageCode',
            'isActive',
        ]),
        extendedForm() {
            return this.$extendedForm({
                key: '@Users/components/Forms/UserForm',
            });
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]) || (!this.isDisabled && this.$hasAccess([
                PRIVILEGES.USER.create,
            ]));
        },
        emailFieldKey() {
            return 'email';
        },
        firstNameFieldKey() {
            return 'firstName';
        },
        lastNameFieldKey() {
            return 'lastName';
        },
        passwordFieldKey() {
            return 'password';
        },
        passwordRepeatFieldKey() {
            return 'passwordRepeat';
        },
        languageFieldKey() {
            return 'language';
        },
        isActiveFieldKey() {
            return 'isActive';
        },
    },
    methods: {
        ...mapActions('user', [
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
        setEmailValue(value) {
            this.__setState({
                key: this.emailFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.emailFieldKey,
                value,
            });
        },
        setFirstNameValue(value) {
            this.__setState({
                key: this.firstNameFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.firstNameFieldKey,
                value,
            });
        },
        setLastNameValue(value) {
            this.__setState({
                key: this.lastNameFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.lastNameFieldKey,
                value,
            });
        },
        setPasswordValue(value) {
            this.__setState({
                key: this.passwordFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.passwordFieldKey,
                value,
            });
        },
        setPasswordRepeatValue(value) {
            this.__setState({
                key: this.passwordRepeatFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.passwordRepeatFieldKey,
                value,
            });
        },
        setLanguageValue(value) {
            this.__setState({
                key: 'languageCode',
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.languageFieldKey,
                value,
            });
        },
        setStatusValue(value) {
            this.__setState({
                key: this.isActiveFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.isActiveFieldKey,
                value,
            });
        },
        dataCyGenerator(key) {
            return `user-${key}`;
        },
    },
};
</script>
