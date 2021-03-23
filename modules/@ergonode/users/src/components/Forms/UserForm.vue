/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('user.form.title')"
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
                    :value="email"
                    required
                    :label="$t('user.form.emailLabel')"
                    :error-messages="errors[emailFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setEmailValue" />
                <TextField
                    :value="firstName"
                    required
                    :label="$t('user.form.nameLabel')"
                    :error-messages="errors[firstNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setFirstNameValue" />
                <TextField
                    :value="lastName"
                    required
                    :label="$t('user.form.lastNameLabel')"
                    :error-messages="errors[lastNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setLastNameValue" />
                <TextField
                    :value="password"
                    required
                    :label="$t('user.form.passwordLabel')"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordValue" />
                <TextField
                    :value="passwordRepeat"
                    required
                    :label="$t('user.form.passwordRepeatLabel')"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordRepeatFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordRepeatValue" />
                <Toggler
                    :value="isActive"
                    :disabled="!isAllowedToUpdate"
                    :label="$t('user.form.activeLabel')"
                    @input="setStatusValue" />
                <LanguageSelect
                    :value="languageCode"
                    required
                    :label="$t('user.form.languageLabel')"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[languageFieldKey]"
                    @input="setLanguageValue" />
                <RolesAutocomplete
                    :value="role"
                    :required="true"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[roleIdFieldKey]"
                    @input="setRoleValue" />
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
import LanguageSelect from '@Core/components/Selects/LanguageSelect';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Button from '@UI/components/Button/Button';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import Select from '@UI/components/Select/Select';
import SelectListNoDataPlaceholder from '@UI/components/SelectList/SelectListNoDataPlaceholder';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import RolesAutocomplete from '@Users/components/Autocompletes/RolesAutocomplete';
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
        RolesAutocomplete,
        CreateUserButton,
        SelectListNoDataPlaceholder,
        Button,
        Divider,
        Form,
        FormSection,
        TextField,
        Toggler,
        Select,
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
            'role',
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
            return 'languageCode';
        },
        roleIdFieldKey() {
            return 'roleId';
        },
        roleFieldKey() {
            return 'role';
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
                key: this.languageFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.languageFieldKey,
                value,
            });
        },
        setRoleValue(value) {
            this.__setState({
                key: this.roleFieldKey,
                value,
            });

            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: this.roleFieldKey,
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
    },
};
</script>
