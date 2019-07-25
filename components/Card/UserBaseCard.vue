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
            @input="(firstName) => setAction({ key: 'firstName', value: firstName })" />
        <TextField
            :value="lastName"
            solid
            required
            regular
            label="Last name"
            :error-messages="errorLastNameMessage"
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
            @input="onStatusChange" />
        <Select
            :value="parsedLanguage"
            solid
            required
            regular
            label="Language"
            :options="languageValues"
            :error-messages="errorLanguageMessage"
            @input="onLanguageChange" />
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
        ...mapState('users', {
            userID: state => state.id,
            email: state => state.email,
            firstName: state => state.firstName,
            lastName: state => state.lastName,
            password: state => state.password,
            passwordRepeat: state => state.passwordRepeat,
            language: state => state.language,
            status: state => state.status,
        }),
        parsedLanguage() {
            return getValueByKey(this.languages, this.language);
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
        onStatusChange(status) {
            this.setAction({ key: 'status', value: getKeyByValue(this.activityStatuses, status) });
        },
    },
};
</script>
