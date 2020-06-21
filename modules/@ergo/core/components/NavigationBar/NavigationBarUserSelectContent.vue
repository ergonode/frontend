/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        data-cy="nav-bar-content"
        class="user-content">
        <NavigationBarUserSelectContentHeader
            :initials="initials"
            :avatar-id="avatarId"
            :email="email" />
        <Divider />
        <MenuList
            v-for="(item, index) in userMenuElements"
            :key="index"
            :section-title="item.title"
            :section-menu="item.menu" />
        <div class="footer">
            <Button
                data-cy="logout-button"
                :theme="secondaryTheme"
                title="LOG OUT"
                @click.native="onLogout" />
        </div>
    </div>
</template>

<script>
import {
    THEME,
} from '@Core/defaults/theme';
import navigationBarUserMenu from '@Core/models/navigation/navigationBarUserMenu';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'NavigationBarUserSelectContent',
    components: {
        Divider: () => import('@Core/components/Dividers/Divider'),
        NavigationBarUserSelectContentHeader: () => import('@Core/components/NavigationBar/NavigationBarUserSelectContentHeader'),
        MenuList: () => import('@Core/components/MenuList/MenuList'),
        Button: () => import('@Core/components/Buttons/Button'),
    },
    props: {
        avatarId: {
            type: String,
            default: '',
        },
        initials: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            userMenuElements: navigationBarUserMenu,
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        ...mapActions('authentication', [
            'setLoggedState',
        ]),
        onLogout() {
            this.setLoggedState(false);
            this.$router.push({
                name: 'index',
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-content {
        display: flex;
        flex-direction: column;
        width: 320px;

        .footer {
            display: flex;
            justify-content: flex-end;
            padding: 16px;
        }
    }
</style>
