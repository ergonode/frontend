/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Users"
            :is-read-only="$isReadOnly('USER')">
            <template #mainAction>
                <Button
                    title="NEW USER"
                    :size="smallSize"
                    :disabled="!$hasAccess(['USER_CREATE'])"
                    @click.native="addUser">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <UsersGridTab />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '@Core/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import UsersGridTab from '~/components/Card/Grid/UsersGridTab';

export default {
    name: 'UsersTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        UsersGridTab,
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'usersGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('usersGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        addUser() {
            this.$router.push({ name: 'user-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'usersGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/accounts`;
        await store.dispatch('usersGrid/getData', gridPath);
    },
};
</script>
