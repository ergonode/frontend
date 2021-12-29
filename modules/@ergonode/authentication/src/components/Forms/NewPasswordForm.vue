/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('@Authentication.authentication.components.NewPasswordForm.button')"
        :is-submitting="isSubmitting"
        :errors="errors"
        @submit="onSubmit">
        <template #header>
            <FormHeader :title="$t('@Authentication.authentication.components.NewPasswordForm.title')" />
        </template>
        <template #body>
            <div>
                <Paragraph :title="$t('@Authentication.authentication.components.NewPasswordForm.info')" />
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
                :label="$t('@Authentication.authentication.components.NewPasswordForm.field')" />
            <Toggler
                v-model="isPasswordVisible"
                :label="$t('@Authentication.authentication.components.NewPasswordForm.toggle')" />
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    ROUTE_NAME,
} from '@Authentication/config/routes';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import modalFeedbackMixin from '@Core/mixins/feedback/modalFeedbackMixin';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NewPasswordForm',
    components: {
        LoginForm,
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
                    title: this.$t('@Authentication.authentication.components.NewPasswordForm.validationHasMinimumLength', {
                        length: this.maxLength,
                    }),
                },
                hasUppercase: {
                    value: false,
                    success: true,
                    title: this.$t('@Authentication.authentication.components.NewPasswordForm.validationHasUppercase'),
                },
                hasLowercase: {
                    value: false,
                    success: true,
                    title: this.$t('@Authentication.authentication.components.NewPasswordForm.validationHasLowercase'),
                },
                hasDigital: {
                    value: false,
                    success: true,
                    title: this.$t('@Authentication.authentication.components.NewPasswordForm.validationHasDigital'),
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
                        message: this.$t('@Authentication.authentication.components.NewPasswordForm.alertSuccess'),
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
