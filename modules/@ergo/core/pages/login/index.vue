/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <main class="login-wrapper">
        <section class="login__form">
            <img
                class="login-form__logo"
                src="@Core/assets/images/login/logo_black.svg"
                alt="ergonode">
            <form
                class="login-form__content"
                @submit.prevent>
                <TextField
                    v-model="userAuthData.username"
                    left-alignment
                    regular
                    underline
                    label="E-mail address" />
                <TextField
                    v-model="userAuthData.password"
                    :input="{ type: 'password' }"
                    left-alignment
                    regular
                    underline
                    label="Password"
                    @keyup.13="onSubmit" />
                <Button
                    title="Log in"
                    type="submit"
                    @click.stop.prevent.native="onSubmit" />
            </form>
        </section>
        <section class="login__background">
            <h1 class="login__background__header">
                The first human - centric <br>designed PIM
            </h1>
            <h2 class="login__background__subheader">
                <ClientOnly>
                    <Typer :value="['Simple', 'Ergonomic', 'Efficient', 'For people.']" />
                </ClientOnly>
            </h2>
        </section>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    layout: 'login',
    name: 'Login',
    components: {
        TextField: () => import('@Core/components/Inputs/TextField'),
        Button: () => import('@Core/components/Buttons/Button'),
        Typer: () => import('@Core/components/Inputs/Typer'),
    },
    data: () => ({
        userAuthData: {
            username: '',
            password: '',
        },
    }),
    created() {
        if (!this.isLogged) {
            this.resetState();
        }
    },
    computed: {
        ...mapState('authentication', {
            isLogged: (state) => state.isLogged,
        }),
    },
    methods: {
        ...mapActions('authentication', [
            'authenticateUser',
        ]),
        ...mapActions([
            'resetState',
        ]),
        async onSubmit() {
            try {
                await this.authenticateUser({ data: this.userAuthData });
                this.$router.push({ name: 'dashboard' });
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "@Core/assets/scss/login/login.scss";
</style>
