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
            <div class="new-password-form__header">
                <h2 v-text="$t('authentication.forms.newPassword.title')" />
            </div>
        </template>
        <template #body>
            <div class="new-password-form__info">
                <p v-text="$t('authentication.forms.newPassword.info')" />
                <List class="new-password-form_list">
                    <li
                        class="list-element"
                        v-for="(item, index) in Object.values(validationHelper)"
                        :key="index">
                        <IconError
                            v-if="!item.value"
                            :fill-color="redColor"
                            width="20"
                            height="20" />
                        <IconSuccess
                            v-else
                            :fill-color="greenColor"
                            width="20"
                            height="20" />
                        <span v-text="item.title" />
                    </li>
                </List>
            </div>
            <TextField
                v-model="password"
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
import {
    GREEN,
    RED,
} from '@UI/assets/scss/_js-variables/colors.scss';
import IconError from '@UI/components/Icons/Feedback/IconError';
import IconSuccess from '@UI/components/Icons/Feedback/IconSuccess';
import List from '@UI/components/List/List';
import TextField from '@UI/components/TextField/TextField';
import Toggler from '@UI/components/Toggler/Toggler';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'PasswordRecoveryForm',
    components: {
        IconError,
        IconSuccess,
        LoginForm,
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
        redColor() {
            return RED;
        },
        greenColor() {
            return GREEN;
        },
    },
    watch: {
        password() {
            this.validationHelper.hasMinimumLength.value = (this.password.length >= 8);
            this.validationHelper.hasUppercase.value = /[A-Z]/.test(this.password);
            this.validationHelper.hasLowercase.value = /[a-z]/.test(this.password);
            this.validationHelper.hasDigital.value = /\d/.test(this.password);
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
                password_repeat: this.password,
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
        &__header {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            grid-column-gap: 16px;
        }

        &__info {
            font: $FONT_MEDIUM_14_20;
        }

        &__info, &__header {
            color: $GRAPHITE_DARK;
        }

        &_list {
            color: $GRAPHITE_DARK;
            font: $FONT_MEDIUM_14_20;

            .list-element {
                display: grid;
                justify-content: flex-start;
                grid-auto-flow: column;
                grid-column-gap: 10px;
                margin: 10px 0;
            }
        }
    }
</style>
