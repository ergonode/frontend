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
                    :section-title="item.title"
                    :section-menu="item.menu"
                />
            </div>
        </aside>
    </div>
</template>

<script>
import sideBarMenu from '~/model/navigation/sideBarMenu';

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
    data() {
        return {
            menu: sideBarMenu,
        };
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

<style lang="scss">
    @import "~/assets/scss/navigation/sidebar.scss";
</style>
