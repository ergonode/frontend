/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login-wrapper">
        <section class="login__form">
            <img
                class="login-form__logo"
                src="~/assets/images/login/logo_black.svg"
                alt="ergonode">
            <form class="login-form__content">
                <TextField
                    v-model="userAuthData.username"
                    left-alignment
                    regular
                    underline
                    label="Username" />
                <TextField
                    v-model="userAuthData.password"
                    :input="{ type: 'password' }"
                    left-alignment
                    regular
                    underline
                    label="Password"
                    @keyup.13="onSubmit" />
                <div class="content__checkbox">
                    <CheckBox v-model="rememberCredentials" />
                    <span class="checkbox-description txt--graphite">
                        Remember me
                    </span>
                </div>
                <Button
                    large
                    color="success"
                    title="Log in"
                    @click.native="onSubmit" />
            </form>
        </section>
        <section class="login__background">
            <h1 class="login__background__header">
                The first human - centric <br>designed PIM
            </h1>
            <h2 class="login__background__subheader txt--white">
                <Typer :value="['Simple', 'Ergonomic', 'Efficient', 'For people.']" />
            </h2>
        </section>
    </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    layout: 'login',
    name: 'Login',
    components: {
        TextField: () => import('~/components/Inputs/TextField'),
        CheckBox: () => import('~/components/Inputs/CheckBox'),
        Button: () => import('~/components/Buttons/Button'),
        Typer: () => import('~/components/Inputs/Typer'),
    },
    data: () => ({
        userAuthData: {
            username: '',
            password: '',
        },
        loginError: false,
        rememberCredentials: false,
    }),
    methods: {
        ...mapActions('authentication', [
            'authenticateUser',
            'getUser',
        ]),
        ...mapActions([
            'resetState',
        ]),
        async onSubmit() {
            await this.authenticateUser({ data: this.userAuthData });

            this.$router.push('/dashboard');
        },
    },
    created() {
        this.resetState();
    },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/login.scss";
</style>
