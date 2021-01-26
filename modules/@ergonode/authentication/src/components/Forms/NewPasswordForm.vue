/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.newPassword.button')"
        :is-submitting="isSubmitting"
        :errors="errors"
        @submit="onSubmit">
        <template #header>
            <FormHeader :title="$t('authentication.forms.newPassword.title')" />
        </template>
        <template #body>
            <div>
                <Paragraph :title="$t('authentication.forms.newPassword.info')" />
                <List>
                    <ListElement
                        v-for="(value, key) in validationHelper"
                        :item="value"
                        :key="key" />
                </List>
            </div>
            <TextField
                v-model="checkPassword"
                required
                :input="passwordInputType"
                :error-messages="errors[passwordFieldKey]"
                :label="$t('authentication.forms.newPassword.field')" />
            <Toggler
                v-model="isPasswordVisible"
                :label="$t('authentication.forms.newPassword.toggle')" />
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import ListElement from '@Authentication/components/Lists/ListElement';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import {
    ROUTE_NAME,
} from '@Core/config/routes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import FormHeader from '@UI/components/Form/FormHeader';
import List from '@UI/components/List/List';
import Paragraph from '@UI/components/Paragraph/Paragraph';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NewPasswordForm',
    components: {
        FormHeader,
        Paragraph,
        LoginForm,
        ListElement,
        List,
        Toggler,
        TextField,
    },
    mixins: [
        modalFeedbackMixin,
    ],
    data() {
        return {
            password: '',
            isPasswordVisible: false,
            isSubmitting: false,
            maxLength: 6,
        };
    },
    computed: {
        checkPassword: {
            get() {
                return this.password;
            },
            set(value) {
                this.validatePassword(value, 'value');

                this.password = value;
            },
        },
        validationHelper() {
            return {
                hasMinimumLength: {
                    value: false,
                    success: true,
                    title: this.$t('authentication.forms.newPassword.validation.hasMinimumLength', {
                        length: this.maxLength,
                    }),
                },
                hasUppercase: {
                    value: false,
                    success: true,
                    title: this.$t('authentication.forms.newPassword.validation.hasUppercase'),
                },
                hasLowercase: {
                    value: false,
                    success: true,
                    title: this.$t('authentication.forms.newPassword.validation.hasLowercase'),
                },
                hasDigital: {
                    value: false,
                    success: true,
                    title: this.$t('authentication.forms.newPassword.validation.hasDigital'),
                },
            };
        },
        passwordInputType() {
            return {
                type: this.isPasswordVisible ? 'text' : 'password',
            };
        },
        passwordFieldKey() {
            return 'password';
        },
    },
    methods: {
        ...mapActions('authentication', [
            'newPassword',
        ]),
        validatePassword(value, key) {
            this.validationHelper.hasMinimumLength = {
                ...this.validationHelper.hasMinimumLength,
                [key]: (value.length >= this.maxLength),
            };
            this.validationHelper.hasUppercase = {
                ...this.validationHelper.hasUppercase,
                [key]: /[A-Z]/.test(value),
            };
            this.validationHelper.hasLowercase = {
                ...this.validationHelper.hasLowercase,
                [key]: /[a-z]/.test(value),
            };
            this.validationHelper.hasDigital = {
                ...this.validationHelper.hasDigital,
                [key]: /\d/.test(value),
            };
        },
        onSubmit() {
            this.isSubmitting = true;

            this.validatePassword(this.password, 'success');

            const data = {
                password: this.password,
                passwordRepeat: this.password,
                token: this.$route.query.token,
                validation: Object.values(this.validationHelper).every(e => e.value),
            };

            this.removeScopeErrors(this.scope);

            this.newPassword({
                data,
                scope: this.scope,
                onSuccess: this.onNewPasswordSuccess,
                onError: this.onNewPasswordError,
            });
        },
        onNewPasswordSuccess() {
            this.isSubmitting = false;
            this.$router.push({
                name: ROUTE_NAME.INDEX,
                params: {
                    loginState: LOGIN_STATE.CREDENTIALS,
                    alert: {
                        type: ALERT_TYPE.SUCCESS,
                        message: this.$t('authentication.forms.newPassword.alertSuccess'),
                    },
                },
            });
        },
        onNewPasswordError(errors) {
            this.removeScopeErrors(this.scope);
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>
