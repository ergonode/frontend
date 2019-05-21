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
                    class="content__input"
                    left-alignment
                    underline
                    label="User name" />
                <TextField
                    v-model="userAuthData.password"
                    class="content__input"
                    :input="{ type: 'password' }"
                    left-alignment
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
                    class="content__button"
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
            <h2 class="txt--white">
                <vue-typer
                    class="txt--white login__background__subheader"
                    :text="['Simple', 'Ergonomic', 'Efficient', 'For people.']"
                    :repeat="Infinity"
                    initial-action="typing"
                    :pre-type-delay="70"
                    :type-delay="70"
                    :pre-erase-delay="2000"
                    :erase-delay="130"
                    erase-style="backspace"
                    :erase-on-complete="false"
                    caret-animation="smooth"
                />
            </h2>
        </section>
    </main>
</template>

<script>
import { mapActions } from 'vuex';
import TextField from '~/components/Inputs/TextField';
import CheckBox from '~/components/Inputs/CheckBox';
import Button from '~/components/Buttons/Button';

export default {
    layout: 'login',
    name: 'Login',
    components: {
        TextField,
        CheckBox,
        Button,
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
