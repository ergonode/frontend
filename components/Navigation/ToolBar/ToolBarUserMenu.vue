/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['user-menu', 'menu--full', { 'user-menu--active': isActive }]">
        <ToolBarUserMenuTop />
        <MenuList
            v-for="(item, index) in userMenuElements"
            :key="index"
            :section-title="item.title"
            :section-menu="item.menu"
        />
        <div class="user-menu__bottom">
            <Button
                class="bottom__logout"
                theme="dark"
                large
                color="transparent"
                title="LOG OUT"
                @click.native="onLogoutClick" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import toolBarUserMenu from '~/model/navigation/toolBarUserMenu';

export default {
    name: 'ToolBarUserMenu',
    components: {
        ToolBarUserMenuTop: () => import('~/components/Navigation/ToolBar/ToolBarUserMenuTop'),
        MenuList: () => import('~/components/Navigation/MenuList'),
        Button: () => import('~/components/Buttons/Button'),
    },
    props: {
        isActive: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    data: () => ({
        userMenuElements: toolBarUserMenu,
    }),
    methods: {
        ...mapActions('authentication', [
            'logout',
        ]),
        onLogoutClick() {
            this.logout();
            this.$router.push('/');
        },
    },
};
</script>
