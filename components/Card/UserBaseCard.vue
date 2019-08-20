/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseCard>
        <TextField
            :value="email"
            solid
            required
            regular
            label="Email"
            :error-messages="errorEmailMessage"
            :disabled="isDisabled"
            @input="(email) => setAction({ key: 'email', value: email })" />
        <TextField
            :value="firstName"
            solid
            required
            regular
            label="First name"
            :error-messages="errorFirstNameMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="(firstName) => setAction({ key: 'firstName', value: firstName })" />
        <TextField
            :value="lastName"
            solid
            required
            regular
            label="Last name"
            :error-messages="errorLastNameMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="(lastName) => setAction({ key: 'lastName', value: lastName })" />
        <TextField
            :value="password"
            solid
            required
            regular
            type="password"
            label="Password"
            :input="{ type: 'password' }"
            :error-messages="errorPasswordMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="(password) => setAction({ key: 'password', value: password })" />
        <TextField
            :value="passwordRepeat"
            solid
            required
            regular
            type="password"
            label="Password repeat"
            :input="{ type: 'password' }"
            :error-messages="errorPasswordRepeatMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="(passwordRepeat) => setAction({
                key: 'passwordRepeat',
                value: passwordRepeat
            })" />
        <Select
            :value="parsedStatus"
            solid
            required
            regular
            label="Activity status"
            :options="statusValues"
            :error-messages="errorStatusMessage"
            :disabled="!isUserAllowedToUpdate"
            @input="onStatusChange" />
        <Select
            :value="parsedLanguage"
            solid
            required
            regular
            label="Language"
            :options="languageValues"
            :disabled="!isUserAllowedToUpdate"
            :error-messages="errorLanguageMessage"
            @input="onLanguageChange" />
        <Select
            :value="parsedRole"
            solid
            required
            regular
            label="Role"
            :options="roleValues"
            :disabled="!isUserAllowedToUpdate"
            :error-messages="errorRoleMessage"
            @input="onRoleChange" />
    </BaseCard>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import BaseCard from '~/components/Card/BaseCard';
import { getValueByKey, getKeyByValue } from '~/model/objectWrapper';

export default {
    name: 'UserBaseCard',
    components: {
        BaseCard,
        TextField: () => import('~/components/Inputs/TextField'),
        Select: () => import('~/components/Inputs/Select/Select'),
    },
    mixins: [errorValidationMixin],
    data() {
        return {
            activityStatuses: {
                ACTIVE: 'Active',
                INACTIVE: 'Inactive',
            },
        };
    },
    computed: {
        ...mapState('data', {
            languages: state => state.languages,
        }),
        ...mapState('roles', {
            roles: state => state.roles,
        }),
        ...mapState('users', {
            userID: state => state.id,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            language: state => state.language,
            status: state => state.status,
            roleId: state => state.roleId,
        }),
        isUserAllowedToUpdate() {
            return this.$canIUse('USER_UPDATE');
        },
        parsedLanguage() {
            return getValueByKey(this.languages, this.language);
        },
        parsedRole() {
            return getValueByKey(this.roles, this.roleId);
        },
        parsedStatus() {
            return getValueByKey(this.activityStatuses, this.status);
        },
        isDisabled() {
            return Boolean(this.userID);
        },
        statusValues() {
            return Object.values(this.activityStatuses);
        },
        languageValues() {
            return Object.values(this.languages);
        },
        roleValues() {
            return Object.values(this.roles);
        },
        errorEmailMessage() {
            const emailIndex = 'email';
            return this.elementIsValidate(emailIndex);
        },
        errorFirstNameMessage() {
            const firstNameIndex = 'firstName';
            return this.elementIsValidate(firstNameIndex);
        },
        errorLastNameMessage() {
            const lastNameIndex = 'lastName';
            return this.elementIsValidate(lastNameIndex);
        },
        errorPasswordMessage() {
            const passwordIndex = 'password';
            return this.elementIsValidate(passwordIndex);
        },
        errorPasswordRepeatMessage() {
            const passwordRepeatIndex = 'passwordRepeat';
            return this.elementIsValidate(passwordRepeatIndex);
        },
        errorLanguageMessage() {
            const languageIndex = 'language';
            return this.elementIsValidate(languageIndex);
        },
        errorRoleMessage() {
            const roleIndex = 'roleId';
            return this.elementIsValidate(roleIndex);
        },
        errorStatusMessage() {
            const statusIndex = 'status';
            return this.elementIsValidate(statusIndex);
        },
    },
    methods: {
        ...mapActions('users', [
            'setAction',
        ]),
        onLanguageChange(language) {
            this.setAction({ key: 'language', value: getKeyByValue(this.languages, language) });
        },
        onRoleChange(role) {
            this.setAction({ key: 'roleId', value: getKeyByValue(this.roles, role) });
        },
        onStatusChange(status) {
            this.setAction({ key: 'status', value: getKeyByValue(this.activityStatuses, status) });
        },
    },
};
</script>
