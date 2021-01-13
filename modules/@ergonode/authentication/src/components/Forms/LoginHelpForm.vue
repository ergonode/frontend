/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm
        :submit-title="$t('authentication.forms.help.redirectTo')"
        @submit="onRedirect">
        <template #header>
            <Fab @click.native="onRedirect">
                <template #icon="{ color }">
                    <IconArrowPointer :fill-color="color" />
                </template>
            </Fab>
            <FormHeader :title="$t('authentication.forms.help.title')" />
        </template>
        <template #body>
            <FormParagraph :text="$t('authentication.forms.help.info')" />
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
import FormHeader from '@UI/components/Form/FormHeader';
import FormParagraph from '@UI/components/Form/FormParagraph';
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';
import IconEmail from '@UI/components/Icons/Others/IconEmail';
import LinkButton from '@UI/components/LinkButton/LinkButton';

export default {
    name: 'LoginHelpForm',
    components: {
        LoginForm,
        Fab,
        FormHeader,
        FormParagraph,
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
    .email-icon {
        margin-right: 8px;
    }
</style>
