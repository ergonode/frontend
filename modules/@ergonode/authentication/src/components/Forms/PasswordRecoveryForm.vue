/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.passwordRecovery.button')"
        :is-submitting="isSubmitting"
        :errors="errors"
        @submit="onSubmit">
        <template #header>
            <Fab @click.native="onRedirect">
                <template #icon="{ color }">
                    <IconArrowPointer :fill-color="color" />
                </template>
            </Fab>
            <FormHeader :title="$t('authentication.forms.passwordRecovery.title')" />
        </template>
        <template #body>
            <Paragraph :title="$t('authentication.forms.passwordRecovery.info')" />
            <TextField
                v-model="email"
                required
                :error-messages="errors[emialFieldKey]"
                :label="$t('authentication.forms.passwordRecovery.field')"
                @keydown.enter.prevent="onSubmit" />
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import scopeErrorsMixin from '@Core/mixins/feedback/scopeErrorsMixin';
import Fab from '@UI/components/Fab/Fab';
import FormHeader from '@UI/components/Form/FormHeader';
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';
import Paragraph from '@UI/components/Paragraph/Paragraph';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'PasswordRecoveryForm',
    components: {
        FormHeader,
        LoginForm,
        Fab,
        Paragraph,
        IconArrowPointer,
        TextField,
    },
    mixins: [
        scopeErrorsMixin,
    ],
    data() {
        return {
            email: '',
            isSubmitting: false,
        };
    },
    computed: {
        emialFieldKey() {
            return 'email';
        },
    },
    methods: {
        ...mapActions('authentication', [
            'passwordRecovery',
        ]),
        onSubmit() {
            this.isSubmitting = true;

            const data = {
                email: this.email,
                url: `${document.location.toString()}password-reset?token=`,
            };

            this.removeScopeErrors(this.scope);

            this.passwordRecovery({
                data,
                scope: this.scope,
                onSuccess: this.onRecoverySuccess,
                onError: this.onRecoveryError,
            });
        },
        onRecoverySuccess() {
            this.isSubmitting = false;
            this.$emit('redirect-to', LOGIN_STATE.CHECK_EMAIL);
        },
        onRecoveryError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        onRedirect() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
    },
};
</script>
