/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.checkEmail.redirectTo')"
        @submit="onRedirectToLogin">
        <template #header>
            <div class="recovery-form__header">
                <Fab @click.native="onBack">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
                    </template>
                </Fab>
                <h2 v-text="$t('authentication.forms.checkEmail.title')" />
            </div>
        </template>
        <template #body>
            <p
                v-text="$t('authentication.forms.checkEmail.info')"
                class="recovery-form__info" />

            <p class="recovery-form__info">
                <span
                    v-text="$t('authentication.forms.checkEmail.infoText')" />
                <span
                    v-text="$t('authentication.forms.checkEmail.infoLink')"
                    @click="onRedirectToHelp"
                    class="link" />
            </p>
        </template>
    </LoginForm>
</template>

<script>
import LoginForm from '@Authentication/components/Forms/LoginForm';
import {
    LOGIN_STATE,
} from '@Authentication/defaults/login-state';
import Fab from '@UI/components/Fab/Fab';
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';

export default {
    name: 'PasswordRecoveryCheckEmail',
    components: {
        LoginForm,
        Fab,
        IconArrowPointer,
    },
    methods: {
        onBack() {
            this.$emit('redirect-to', LOGIN_STATE.PASSWORD_RECOVERY);
        },
        onRedirectToLogin() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
        onRedirectToHelp() {
            this.$emit('redirect-to', LOGIN_STATE.HELP);
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
            margin: 0;
            font: $FONT_MEDIUM_14_20;

            .link {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        &__info, &__header {
            color: $GRAPHITE_DARK;
        }
    }
</style>
