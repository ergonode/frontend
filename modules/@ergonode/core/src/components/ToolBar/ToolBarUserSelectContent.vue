/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        data-cy="tool-bar-content"
        class="user-content">
        <ToolBarUserSelectContentHeader
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
    name: 'ToolBarUserSelectContent',
    components: {
        Divider: () => import('@Core/components/Dividers/Divider'),
        ToolBarUserSelectContentHeader: () => import('@Core/components/ToolBar/ToolBarUserSelectContentHeader'),
        MenuList: () => import('@Core/components/MenuList/MenuList'),
        Button: () => import('@Core/components/Button/Button'),
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
            '__setState',
        ]),
        onLogout() {
            this.__setState({
                key: 'isLogged',
                value: false,
            });
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
