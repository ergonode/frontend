/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="user-menu__top">
        <Picture
            v-if="avatarID"
            fab
            shadow
            class="user-img"
            :image-id="avatarID"
            :image-style="{ width: '64px', height: '64px'}" />
        <Icon
            v-else
            class="user-img"
            icon="sprite-navbar navbar-user"
            size="hugh" />
        <div class="user-data">
            <span
                class="user-data__name"
                :title="userInitials">
                {{ userInitials }}
            </span>
            <span class="user-data__email">
                {{ email }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ToolBarUserMenuTop',
    components: {
        Picture: () => import('~/components/Multimedia/Picture'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        userInitials() {
            if (this.user) {
                const { first_name: firstName, last_name: lastName } = this.user;
                return this.user ? `${firstName} ${lastName}` : '';
            }
            return null;
        },
        email() {
            if (this.user) {
                const { email } = this.user;
                return this.user ? email : '';
            }
            return null;
        },
        avatarID() {
            if (this.user) {
                const { avatar_id: avatarID } = this.user;
                return avatarID;
            }
            return null;
        },
    },
};
</script>
