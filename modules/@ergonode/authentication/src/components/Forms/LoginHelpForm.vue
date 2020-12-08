/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.help.redirectTo')"
        @submit="onRedirect">
        <template #header>
            <div class="help-form__header">
                <Fab @click.native="onRedirect">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
                    </template>
                </Fab>
                <h2 v-text="$t('authentication.forms.help.title')" />
            </div>
        </template>
        <template #body>
            <p
                v-text="$t('authentication.forms.help.info')"
                class="help-form__info" />
            <LinkButton title="team@ergonode.com">
                <template #prepend>
                    <IconEmail class="email-icon" />
                </template>
            </LinkButton>
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
import IconEmail from '@UI/components/Icons/Others/IconEmail';
import LinkButton from '@UI/components/LinkButton/LinkButton';

export default {
    name: 'LoginHelpForm',
    components: {
        LoginForm,
        Fab,
        IconArrowPointer,
        LinkButton,
        IconEmail,
    },
    methods: {
        onRedirect() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
    },
};
</script>

<style lang="scss" scoped>
    .help-form {
        &__header {
            display: grid;
            align-items: center;
            grid-auto-flow: column;
            grid-column-gap: 16px;
            font: $FONT_SEMI_BOLD_20_24;
        }

        &__info {
            font: $FONT_MEDIUM_14_20;
        }

        &__info, &__header {
            color: $GRAPHITE_DARK;
        }
    }

    .email-icon {
        margin-right: 8px;
    }
</style>
