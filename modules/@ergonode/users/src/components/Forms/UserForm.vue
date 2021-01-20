/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Form
        :title="$t('user.form.title')"
        :submit-title="submitTitle"
        :proceed-title="proceedTitle"
        :is-submitting="isSubmitting"
        :is-proceeding="isProceeding"
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
                <Select
                    :value="language"
                    required
                    :label="$t('user.form.languageLabel')"
                    :options="languageOptions"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[languageFieldKey]"
                    @input="setLanguageValue" />
                <Autocomplete
                    :value="role"
                    :required="true"
                    :searchable="true"
                    :clearable="true"
                    :label="$t('user.form.roleLabel')"
                    :disabled="!isAllowedToUpdate"
                    :error-messages="errors[roleIdFieldKey]"
                    href="roles/autocomplete"
                    @input="setRoleValue">
                    <DropdownPlaceholder
                        :title="placeholder.title"
                        :subtitle="placeholder.subtitle">
                        <template #action>
                            <Button
                                :title="$t('user.form.noRoleButton')"
                                :size="smallSize"
                                :disabled="!isAllowedToUpdate"
                                @click.native="onNavigateToUserRoles" />
                        </template>
                    </DropdownPlaceholder>
                </Autocomplete>
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
import {
    SIZE,
} from '@Core/defaults/theme';
import formFeedbackMixin from '@Core/mixins/feedback/formFeedbackMixin';
import formActionsMixin from '@Core/mixins/form/formActionsMixin';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import Divider from '@UI/components/Dividers/Divider';
import Form from '@UI/components/Form/Form';
import FormSection from '@UI/components/Form/Section/FormSection';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import Select from '@UI/components/Select/Select';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import PRIVILEGES from '@Users/config/privileges';
import {
    ROUTE_NAME,
} from '@Users/config/routes';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'UserForm',
    components: {
        Button,
        DropdownPlaceholder,
        Divider,
        Form,
        FormSection,
        TextField,
        Toggler,
        Select,
        Autocomplete,
    },
    mixins: [
        formActionsMixin,
        formFeedbackMixin,
    ],
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
        smallSize() {
            return SIZE.SMALL;
        },
        placeholder() {
            return {
                title: this.$t('user.form.noRoleTitle'),
                subtitle: this.$t('user.form.noRoleSubtitle'),
            };
        },
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
        onNavigateToUserRoles() {
            this.$router.push({
                name: ROUTE_NAME.USER_ROLES_GRID,
            });
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
