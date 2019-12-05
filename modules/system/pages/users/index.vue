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
                <PrependIconButton
                    title="NEW USER"
                    :size="smallSize"
                    :disabled="!$hasAccess(['USER_CREATE'])"
                    @click.native="addUser">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <UsersGridTab />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import UsersGridTab from '~/components/Card/Grid/UsersGridTab';

export default {
    name: 'UsersTabs',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        UsersGridTab,
        PrependIconButton,
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
            this.$router.push('/users/user/new/general');
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
