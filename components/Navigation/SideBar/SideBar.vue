/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['side-bar-wrapper', menuStateClass]">
        <aside :class="['side-bar', menuStateClass]">
            <div class="side-bar__content">
                <MenuList
                    v-for="(item, index) in menuList"
                    :key="index"
                    :section-title="item.title"
                    :section-menu="item.section" />
            </div>
        </aside>
    </div>
</template>

<script>
import { getValidatedMenuData } from '~/model/navigation/sideBarMenu';

export default {
    name: 'SideBar',
    components: {
        MenuList: () => import('~/components/Navigation/MenuList'),
    },
    props: {
        value: {
            type: Number,
            required: false,
            default: 2,
        },
    },
    beforeCreate() {
        this.menu = getValidatedMenuData(this.$canIUse);
    },
    beforeDestroy() {
        delete this.menu;
    },
    computed: {
        menuStateClass() {
            let state = 'full';
            if (this.value === 0) state = 'hidden';
            if (this.value === 1) state = 'icons';
            return `menu--${state}`;
        },
        menuList() {
            const { menu: modulesMenu } = this.$modulesConfiguration;
            const menuList = this.menu;
            for (let i = 0; i < modulesMenu.length; i += 1) {
                const index = this.menu.findIndex(e => e.title === modulesMenu[i].title);
                if (index >= 0) {
                    menuList[index].menu.push(...modulesMenu[i].menu);
                } else {
                    menuList.push(modulesMenu[i]);
                }
            }
            return menuList;
        },
    },
};
</script>

<style lang="scss">
    @import "~/assets/scss/navigation/sidebar.scss";
</style>
