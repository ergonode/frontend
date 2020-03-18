/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm>
        <template #header>
            <div class="help-form__header">
                <Fab @click.native="onBack">
                    <template #icon="{ color }">
                        <IconArrowPointer :fill-color="color" />
                    </template>
                </Fab>
                <h2 v-text="helpHeader" />
            </div>
        </template>
        <template #body>
            <p
                v-text="helpInfo"
                class="help-form__info" />
            <LinkButton title="team@ergonode.com">
                <template #prepend>
                    <IconEmail />
                </template>
            </LinkButton>
        </template>
        <template #footer>
            <Button
                title="BACK TO LOG IN PAGE"
                type="submit"
                @click.stop.prevent.native="onBack" />
        </template>
    </LoginForm>
</template>

<script>
import { LOGIN_STATE } from '@Authentication/defaults/login-state';
import LoginForm from '@Authentication/components/Form/LoginForm';
import Fab from '@Core/components/Buttons/Fab';
import IconArrowPointer from '@Core/components/Icons/Arrows/IconArrowPointer';
import IconEmail from '@Core/components/Icons/Others/IconEmail';
import LinkButton from '@Core/components/Buttons/LinkButton';
import Button from '@Core/components/Buttons/Button';

export default {
    name: 'LoginHelpForm',
    components: {
        LoginForm,
        Fab,
        IconArrowPointer,
        LinkButton,
        IconEmail,
        Button,
    },
    computed: {
        helpHeader() {
            return 'Help';
        },
        helpInfo() {
            return 'If you have any problems with your account, please contact the system administrator';
        },
    },
    methods: {
        onBack() {
            this.$emit('backTo', LOGIN_STATE.CREDENTIALS);
        },
    },
};
</script>

<style lang="scss" scoped>
    .login-header {
        justify-content: flex-start;
    }

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
</style>
