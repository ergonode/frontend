/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Users"
            icon="User"
            :is-read-only="$isReadOnly($route.meta.isReadOnly)">
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
            <template
                v-if="isUserRolesTab"
                #subActions>
                <TitleBarSubActions>
                    <PrependIconButton
                        title="NEW ROLE"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        :disabled="!$hasAccess(['USER_ROLE_CREATE'])"
                        @click.native="addUserRole">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </PrependIconButton>
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
    </BasePage>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'UsersTabs',
    middleware: ['tab/redirectToUsersGrid'],
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        TitleBarSubActions: () => import('~/core/components/TitleBar/TitleBarSubActions'),
        BasePage: () => import('~/core/components/Layout/BasePage'),
        PrependIconButton,
        IconAdd,
    },
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isUserRolesTab() {
            return /roles/.test(this.$route.path);
        },
    },
    methods: {
        addUser() {
            this.$router.push('/users/user/new/general');
        },
        addUserRole() {
            this.$router.push('/users/role/new/general');
        },
    },
};
</script>
