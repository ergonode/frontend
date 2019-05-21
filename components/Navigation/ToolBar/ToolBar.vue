/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <nav class="tool-bar">
        <section class="tool-bar__part">
            <ToolBarButton
                @click.native="changeStateSidebar">
                <Icon
                    icon="sprite-navbar"
                    :class="menuStateIcon"
                    size="medium" />
                    <!--
                      TODO: Something is wrong with computed property in Icon component.
                      If we used attribut :icon, class value not chenged.
                    -->
            </ToolBarButton>
            <nuxt-link
                :to="createNuxtLink('/dashboard')">
                <img
                    class="part__element"
                    src="~assets/images/logo.svg"
                    alt="ergonode"
                    title="ergonode">
            </nuxt-link>
        </section>
        <section class="tool-bar__part tool-bar__part--right">
            <ToolBarUserButton />
            <ToolBarButton>
                <Icon
                    icon="sprite-navbar navbar-refresh"
                    size="medium" />
            </ToolBarButton>
            <ToolBarButton>
                <Icon
                    icon="sprite-navbar navbar-bell"
                    size="medium" />
            </ToolBarButton>
        </section>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ToolBar',
    components: {
        ToolBarButton: () => import('~/components/Navigation/ToolBar/ToolBarButton'),
        ToolBarUserButton: () => import('~/components/Navigation/ToolBar/ToolBarUserButton'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    computed: {
        ...mapState('settings', {
            sideBarState: state => state.sideBarState,
        }),
        getMenuIcon() {
            switch (this.sideBarState) {
            case 2:
                return 'icons';
            case 1:
                return 'hidden';
            default:
                return 'full';
            }
        },
        menuStateIcon() {
            return `navbar-menu-${this.getMenuIcon}`;
        },
    },
    methods: {
        ...mapActions('settings', [
            'setSideBarState',
        ]),
        changeStateSidebar() {
            const state = this.sideBarState;
            const newState = state > 0 ? state - 1 : 2;
            localStorage.setItem('sideBarState', newState);
            this.setSideBarState(newState);
        },
        createNuxtLink(target) {
            return {
                path: target,
            };
        },
    },
};
</script>

<style lang="scss">
    @import "~/assets/scss/navigation/toolbar.scss";
</style>
