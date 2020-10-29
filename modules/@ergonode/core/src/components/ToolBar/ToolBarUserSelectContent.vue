/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        data-cy="tool-bar-content"
        class="tool-bar-user-select-content">
        <ToolBarUserSelectContentHeader />
        <Divider />
        <MenuList
            v-for="(item, index) in navigationBarUserMenu"
            :key="index"
            :title="item.title"
            :menu="item.menu" />
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
import Button from '@Core/components/Button/Button';
import Divider from '@Core/components/Dividers/Divider';
import MenuList from '@Core/components/MenuList/MenuList';
import ToolBarUserSelectContentHeader from '@Core/components/ToolBar/ToolBarUserSelectContentHeader';
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
        Divider,
        ToolBarUserSelectContentHeader,
        MenuList,
        Button,
    },
    computed: {
        navigationBarUserMenu() {
            return navigationBarUserMenu;
        },
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
    .tool-bar-user-select-content {
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
