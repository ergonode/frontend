/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
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
                    :value="email"
                    required
                    label="Email"
                    :error-messages="errors[emailFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setEmailValue" />
                <TextField
                    :value="firstName"
                    required
                    label="First name"
                    :error-messages="errors[firstNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setFirstNameValue" />
                <TextField
                    :value="lastName"
                    required
                    label="Last name"
                    :error-messages="errors[lastNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setLastNameValue" />
                <TextField
                    :value="password"
                    required
                    label="Password"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordValue" />
                <TextField
                    :value="passwordRepeat"
                    required
                    label="Password repeat"
                    :input="{ type: 'password' }"
                    :error-messages="errors[passwordRepeatFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordRepeatValue" />
                <Toggler
                    :value="isActive"
                    :disabled="!isAllowedToUpdate"
                    label="The active status"
                    @input="setStatusValue" />
                <Select
                    :value="language"
                    required
                    label="Language"
                    :options="languageOptions"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[languageFieldKey]"
                    @input="setLanguageValue" />
                <TranslationLazySelect
                    :value="role"
                    :required="true"
                    label="Role"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[roleIdFieldKey]"
                    :fetch-options-request="getRoleOptions"
                    @input="setRoleValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import Form from '@Core/components/Form/Form';
import FormSection from '@Core/components/Form/Section/FormSection';
import Select from '@Core/components/Inputs/Select/Select';
import TranslationLazySelect from '@Core/components/Inputs/Select/TranslationLazySelect';
import TextField from '@Core/components/Inputs/TextField';
import Toggler from '@Core/components/Inputs/Toggler/Toggler';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'UserForm',
    components: {
        Form,
        FormSection,
        TextField,
        Toggler,
        Select,
        TranslationLazySelect,
    },
    mixins: [
        formActionsMixin,
    ],
    props: {
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            activityStatuses: [
                {
                    id: true,
                    name: 'Active',
                },
                {
                    id: false,
                    name: 'Inactive',
                },
            ],
        };
    },
    computed: {
        ...mapGetters('core', [
            'activeLanguages',
        ]),
        ...mapState('user', [
            'id',
            'email',
            'firstName',
            'lastName',
            'password',
            'passwordRepeat',
            'language',
            'isActive',
            'role',
        ]),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
        isDisabled() {
            return Boolean(this.id);
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
        languageOptions() {
            return this.activeLanguages.map(({
                name,
            }) => name);
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
        roleIdFieldKey() {
            return 'roleId';
        },
    },
    methods: {
        ...mapActions('user', [
            '__setState',
        ]),
        ...mapActions('role', [
            'getRoleOptions',
        ]),
        setEmailValue(value) {
            this.__setState({
                key: 'email',
                value,
            });
        },
        setFirstNameValue(value) {
            this.__setState({
                key: 'firstName',
                value,
            });
        },
        setLastNameValue(value) {
            this.__setState({
                key: 'lastName',
                value,
            });
        },
        setPasswordValue(value) {
            this.__setState({
                key: 'password',
                value,
            });
        },
        setPasswordRepeatValue(value) {
            this.__setState({
                key: 'passwordRepeat',
                value,
            });
        },
        setLanguageValue(value) {
            this.__setState({
                key: 'language',
                value,
            });
        },
        setRoleValue(value) {
            this.__setState({
                key: 'role',
                value,
            });
        },
        setStatusValue(value) {
            this.__setState({
                key: 'isActive',
                value,
            });
        },
    },
};
</script>
