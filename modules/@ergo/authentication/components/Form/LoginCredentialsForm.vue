/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <LoginForm>
        <template #header>
            <div class="logo-header">
                <IconLogoName />
            </div>
        </template>
        <template #body>
            <TextField
                data-cy="login-email"
                v-model="email"
                solid
                regular
                label="E-mail" />
            <TextField
                data-cy="login-pass"
                v-model="password"
                solid
                :input="passwordInputType"
                regular
                label="Password"
                @keyup.13="onSubmit" />
            <Toggler
                v-model="isPasswordVisible"
                label="Show password" />
        </template>
        <template #footer>
            <Button
                data-cy="login-button"
                title="LOG IN"
                type="submit"
                @click.stop.prevent.native="onSubmit" />
        </template>
    </LoginForm>
</template>

<script>
import { mapActions } from 'vuex';
import LoginForm from '@Authentication/components/Form/LoginForm';
import TextField from '@Core/components/Inputs/TextField';
import Button from '@Core/components/Buttons/Button';
import Toggler from '@Core/components/Inputs/Toggler/Toggler';
import IconLogoName from '@Core/components/Icons/Logo/IconLogoName';

export default {
    name: 'LoginCredentialsForm',
    components: {
        LoginForm,
        TextField,
        Button,
        Toggler,
        IconLogoName,
    },
    data() {
        return {
            email: '',
            password: '',
            isPasswordVisible: false,
        };
    },
    computed: {
        passwordInputType() {
            return { type: this.isPasswordVisible ? 'text' : 'password' };
        },
    },
    methods: {
        ...mapActions('authentication', [
            'authenticateUser',
        ]),
        async onSubmit() {
            try {
                await this.authenticateUser({
                    data: {
                        username: this.email,
                        password: this.password,
                    },
                });
                this.$router.push({ name: 'dashboard' });
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .logo-header {
        display: flex;
        flex: 1;
        justify-content: center;
    }
</style>
