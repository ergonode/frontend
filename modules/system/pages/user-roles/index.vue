/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="User roles"
            :is-read-only="$isReadOnly('USER')">
            <template #mainAction>
                <Button
                    title="NEW ROLE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['USER_CREATE'])"
                    @click.native="addUserRole">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <RolesGridTab />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import Button from '~/core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import RolesGridTab from '~/components/Card/Grid/RolesGridTab';

export default {
    name: 'UsersTabs',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        RolesGridTab,
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'rolesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('rolesGrid');
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
        addUserRole() {
            this.$router.push({ name: 'user-role-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'rolesGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/roles`;
        await store.dispatch('rolesGrid/getData', gridPath);
    },
};
</script>
