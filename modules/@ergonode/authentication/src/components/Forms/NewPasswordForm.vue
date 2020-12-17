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
            <FormHeader :text="$t('authentication.forms.newPassword.title')" />
        </template>
        <template #body>
            <div class="new-password-form__info">
                <FormParagraph :text="$t('authentication.forms.newPassword.info')" />
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
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import FormHeader from '@UI/components/Form/FormHeader';
import FormParagraph from '@UI/components/Form/FormParagraph';
import List from '@UI/components/List/List';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'PasswordRecoveryForm',
    components: {
        FormHeader,
        FormParagraph,
        LoginForm,
        ListElement,
        List,
        Toggler,
        TextField,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    data() {
        return {
            password: '',
            isPasswordVisible: false,
            isSubmitting: false,
        };
    },
    computed: {
        checkPassword: {
            get() {
                return this.password;
            },
            set(value) {
                this.validationHelper.hasMinimumLength = {
                    ...this.validationHelper.hasMinimumLength,
                    value: (value.length >= 8),
                };
                this.validationHelper.hasUppercase = {
                    ...this.validationHelper.hasUppercase,
                    value: /[A-Z]/.test(value),
                };
                this.validationHelper.hasLowercase = {
                    ...this.validationHelper.hasLowercase,
                    value: /[a-z]/.test(value),
                };
                this.validationHelper.hasDigital = {
                    ...this.validationHelper.hasDigital,
                    value: /\d/.test(value),
                };

                this.password = value;
            },
        },
        validationHelper() {
            return {
                hasMinimumLength: {
                    value: false,
                    title: this.$t('authentication.forms.newPassword.validation.hasMinimumLength'),
                },
                hasUppercase: {
                    value: false,
                    title: this.$t('authentication.forms.newPassword.validation.hasUppercase'),
                },
                hasLowercase: {
                    value: false,
                    title: this.$t('authentication.forms.newPassword.validation.hasLowercase'),
                },
                hasDigital: {
                    value: false,
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
        onSubmit() {
            this.isSubmitting = true;

            const data = {
                password: this.password,
                passwordRepeat: this.password,
                token: this.$route.query.token,
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
            this.onError(errors);

            this.isSubmitting = false;
        },
    },
};
</script>

<style lang="scss" scoped>
    .new-password-form {
        &__info {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;
        }
    }
</style>
