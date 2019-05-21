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
                    :selected-element="selectedElement"
                />
            </div>
        </aside>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import sideBarMenu from '~/model/navigation/sideBarMenu';

export default {
    name: 'SideBarMenu',
    components: {
        MenuList: () => import('~/components/Navigation/MenuList'),
    },
    data: () => ({
        menu: sideBarMenu,
        selectedElement: '/dashboard',
    }),
    computed: {
        ...mapState('settings', {
            sideBarState: state => state.sideBarState,
        }),
        getClassName() {
            switch (this.sideBarState) {
            case 1:
                return 'icons';
            case 0:
                return 'hidden';
            default:
                return 'full';
            }
        },
        menuStateClass() {
            return `menu--${this.getClassName}`;
        },
    },
    watch: {
        '$route'(to) { // eslint-disable-line object-shorthand
            this.setPath(to);
        },
    },
    mounted() {
        this.setPath(this.$route);
    },
    methods: {
        setPath(route) {
            const { path, params } = route;
            let [, newPath] = path.split('/');
            if (params.placeholder) {
                newPath = `${newPath}/${params.placeholder}`;
            }
            this.selectedElement = `/${newPath}`;
        },
    },
};
</script>

<style lang="scss">
    @import "~/assets/scss/navigation/sidebar.scss";
</style>
