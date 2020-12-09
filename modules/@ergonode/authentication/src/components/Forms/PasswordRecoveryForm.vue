/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.passwordRecovery.button')"
        :is-submitting="isSubmitting"
        :errors="scopeErrors"
        @submit="onSubmit">
        <template #header>
            <div class="recovery-form__header">
                <Fab @click.native="onRedirect">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
                    </template>
                </Fab>
                <h2 v-text="$t('authentication.forms.passwordRecovery.title')" />
            </div>
        </template>
        <template #body>
            <p
                v-text="$t('authentication.forms.passwordRecovery.info')"
                class="recovery-form__info" />
            <TextField
                v-model="email"
                required
                :error-messages="scopeErrors.email"
                :label="$t('authentication.forms.passwordRecovery.field')" />
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
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';
import TextField from '@UI/components/TextField/TextField';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'PasswordRecoveryForm',
    components: {
        LoginForm,
        Fab,
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
    methods: {
        ...mapActions('authentication', [
            'passwordRecovery',
        ]),
        onSubmit() {
            this.isSubmitting = true;

            const data = {
                email: this.email,
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

<style lang="scss" scoped>
    .recovery-form {
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
    }
</style>
