/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="Options"
        :fields-keys="[
            emailFieldKey,
            firstNameFieldKey,
            lastNameFieldKey,
            passwordFieldKey,
            passwordRepeatFieldKey,
            languageFieldKey,
            roleIdFieldKey,
        ]">
        <template #body="{ errorMessages }">
            <FormSection>
                <TextField
                    :value="email"
                    required
                    label="Email"
                    :error-messages="errorMessages[emailFieldKey]"
                    :disabled="isDisabled || !isAllowedToUpdate"
                    @input="setEmailValue" />
                <TextField
                    :value="firstName"
                    required
                    label="First name"
                    :error-messages="errorMessages[firstNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setFirstNameValue" />
                <TextField
                    :value="lastName"
                    required
                    label="Last name"
                    :error-messages="errorMessages[lastNameFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setLastNameValue" />
                <TextField
                    :value="password"
                    required
                    label="Password"
                    :input="{ type: 'password' }"
                    :error-messages="errorMessages[passwordFieldKey]"
                    :disabled="!isAllowedToUpdate"
                    @input="setPasswordValue" />
                <TextField
                    :value="passwordRepeat"
                    required
                    label="Password repeat"
                    :input="{ type: 'password' }"
                    :error-messages="errorMessages[passwordRepeatFieldKey]"
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
                    :error-messages="errorMessages[languageFieldKey]"
                    @input="setLanguageValue" />
                <TranslationLazySelect
                    :value="role"
                    :required="true"
                    label="Role"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errorMessages[roleIdFieldKey]"
                    :fetch-options-request="getRoleOptions"
                    @input="setRoleValue" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import PRIVILEGES from '@Users/config/privileges';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'UserForm',
    components: {
        Form: () => import('@Core/components/Form/Form'),
        FormSection: () => import('@Core/components/Form/Section/FormSection'),
        TextField: () => import('@Core/components/Inputs/TextField'),
        Toggler: () => import('@Core/components/Inputs/Toggler/Toggler'),
        Select: () => import('@Core/components/Inputs/Select/Select'),
        TranslationLazySelect: () => import('@Core/components/Inputs/Select/TranslationLazySelect'),
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
        ...mapState('user', {
            userID: state => state.id,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            language: state => state.language,
            isActive: state => state.isActive,
            role: state => state.role,
        }),
        isUserAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
        isDisabled() {
            return Boolean(this.userID);
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
