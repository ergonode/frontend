/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        tabindex="0"
        :class="['part__element','part__element--user', {'user-button--active': isActive}]"
        @blur="hide"
        @click="toggle">
        <Picture
            v-if="avatarID"
            fab
            shadow
            class="user-button__avatar"
            :image-id="avatarID" />
        <Icon
            v-else
            class="user-button__avatar"
            icon="sprite-navbar navbar-user"
            size="medium" />
        <span class="user-button__name">
            {{ showName }}
        </span>
        <div class="user-button__arrow-container">
            <Icon
                :icon="`sprite-navbar ${changeIcon}`"
                size="medium" />
        </div>
        <ToolBarUserMenu
            :is-active="isActive"
            @click.native="toggle" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ToolBarUserButton',
    components: {
        ToolBarUserMenu: () => import('~/components/Navigation/ToolBar/ToolBarUserMenu'),
        Picture: () => import('~/components/Multimedia/Picture'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    data: () => ({
        isActive: false,
    }),
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        showName() {
            if (this.user) {
                const { first_name: firstName } = this.user;
                return this.user ? firstName : '';
            }
            return null;
        },
        userInitials() {
            if (this.user) {
                const { first_name: firstName, last_name: lastName } = this.user;
                return this.user ? `${firstName} ${lastName}` : '';
            }
            return null;
        },
        changeIcon() {
            return !this.isActive ? 'navbar-arrow' : 'navbar-arrow trans-half';
        },
        avatarID() {
            if (this.user) {
                const { avatar_id: avatarID } = this.user;
                return avatarID;
            }
            return null;
        },
    },
    methods: {
        toggle() {
            this.isActive = !this.isActive;
        },
        hide() {
            this.isActive = false;
        },
        show() {
            this.isActive = true;
        },
    },
};
</script>
