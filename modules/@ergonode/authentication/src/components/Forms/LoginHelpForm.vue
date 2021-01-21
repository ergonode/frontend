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
            <Paragraph :title="$t('authentication.forms.help.info')" />
            <LinkButton
                :title="email"
                @click.native="onMailTo">
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
import IconArrowPointer from '@UI/components/Icons/Arrows/IconArrowPointer';
import IconEmail from '@UI/components/Icons/Others/IconEmail';
import LinkButton from '@UI/components/LinkButton/LinkButton';
import Paragraph from '@UI/components/Paragraph/Paragraph';

export default {
    name: 'LoginHelpForm',
    components: {
        LoginForm,
        Fab,
        FormHeader,
        Paragraph,
        IconArrowPointer,
        LinkButton,
        IconEmail,
    },
    data() {
        return {
            email: 'team@ergonode.com',
        };
    },
    methods: {
        onRedirect() {
            this.$emit('redirect-to', LOGIN_STATE.CREDENTIALS);
        },
        onMailTo() {
            window.location = `mailto:${this.email}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .email-icon {
        margin-right: 8px;
    }
</style>
