/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        title="General"
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
                    :disabled="isDisabled || isDisabledByPrivileges"
                    @input="(value) => setAction({ key: 'email', value })" />
                <TextField
                    :value="firstName"
                    required
                    label="First name"
                    :error-messages="errorMessages[firstNameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="(value) => setAction({ key: 'firstName', value })" />
                <TextField
                    :value="lastName"
                    required
                    label="Last name"
                    :error-messages="errorMessages[lastNameFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="(value) => setAction({ key: 'lastName', value })" />
                <TextField
                    :value="password"
                    required
                    type="password"
                    label="Password"
                    :input="{ type: 'password' }"
                    :error-messages="errorMessages[passwordFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="(value) => setAction({ key: 'password', value })" />
                <TextField
                    :value="passwordRepeat"
                    required
                    type="password"
                    label="Password repeat"
                    :input="{ type: 'password' }"
                    :error-messages="errorMessages[passwordRepeatFieldKey]"
                    :disabled="isDisabledByPrivileges"
                    @input="(value) => setAction({
                        key: 'passwordRepeat',
                        value
                    })" />
                <Toggler
                    :value="isActive"
                    :disabled="isDisabledByPrivileges"
                    label="The active status"
                    @input="onStatusChange" />
                <Select
                    :value="language"
                    required
                    label="Language"
                    :options="languageOptions"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[languageFieldKey]"
                    @input="onLanguageChange" />
                <TranslationLazySelect
                    :value="role"
                    :required="true"
                    label="Role"
                    :disabled="isDisabledByPrivileges"
                    :error-messages="errorMessages[roleIdFieldKey]"
                    :fetch-options-request="getRolesOptionsRequest"
                    @input="onRoleChange" />
            </FormSection>
        </template>
    </Form>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

const getRolesOptions = () => import('@Users/services/getRolesOptions.service');

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
            'getActiveLanguages',
        ]),
        ...mapState('users', {
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
                'USER_UPDATE',
            ]);
        },
        isDisabled() {
            return Boolean(this.userID);
        },
        isDisabledByPrivileges() {
            return (this.isDisabled && !this.$hasAccess([
                'USER_UPDATE',
            ]))
            || (!this.isDisabled && !this.$hasAccess([
                'USER_CREATE',
            ]));
        },
        languageOptions() {
            return this.getActiveLanguages.map(({
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
        ...mapActions('users', [
            'setAction',
        ]),
        getRolesOptionsRequest() {
            return getRolesOptions().then(response => response.default(
                {
                    $axios: this.$axios,
                    $store: this.$store,
                },
            ));
        },
        onLanguageChange(language) {
            this.setAction({
                key: 'language',
                value: language,
            });
        },
        onRoleChange(role) {
            this.setAction({
                key: 'role',
                value: role,
            });
        },
        onStatusChange(isActive) {
            this.setAction({
                key: 'isActive',
                value: isActive,
            });
        },
    },
};
</script>
