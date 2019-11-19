/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="user-content">
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
                :theme="secondaryTheme"
                title="LOG OUT"
                @click.native="onLogout" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { THEMES } from '~/defaults/buttons';
import navigationBarUserMenu from '~/model/navigation/navigationBarUserMenu';

export default {
    name: 'NavigationBarUserSelectContent',
    components: {
        Divider: () => import('~/components/Dividers/Divider'),
        NavigationBarUserSelectContentHeader: () => import('~/components/Navigation/NavigationBar/NavigationBarUserSelectContentHeader'),
        MenuList: () => import('~/components/Navigation/MenuList'),
        Button: () => import('~/components/Buttons/Button'),
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
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('authentication', [
            'logout',
        ]),
        onLogout() {
            this.logout();
            this.$router.push('/');
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 320px;

        .footer {
            display: flex;
            justify-content: flex-end;
            padding: 16px;
        }
    }
</style>
