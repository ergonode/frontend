/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="['side-bar-wrapper', menuStateClass]">
        <aside :class="['side-bar', menuStateClass]">
            <div class="side-bar__content">
                <MenuList
                    v-for="(item, index) in menu"
                    :key="index"
                    :section-title="item.key"
                    :section-menu="item.items" />
            </div>
        </aside>
    </div>
</template>

<script>
import { getValidatedMenuData } from '~/model/navigation/sideBarMenu';

export default {
    name: 'SideBar',
    components: {
        MenuList: () => import('~/core/components/MenuList/MenuList'),
    },
    props: {
        value: {
            type: Number,
            default: 2,
        },
    },
    beforeCreate() {
        const { menu: modulesMenu } = this.$modulesConfiguration;
        this.menu = getValidatedMenuData(this.$hasAccess, modulesMenu);
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
    },
};
</script>

<style lang="scss" scoped>
    @import "~/assets/scss/navigation/sidebar.scss";
</style>
