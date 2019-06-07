/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton :title="capitalizedUserFirstName || capitalizedUserLastName">
        <div
            slot="prependIcon"
            class="user-image">
            <Picture
                v-if="user.avatar_id"
                class="user-button__avatar"
                fab
                :image-id="user.avatar_id" />
            <Icon
                v-else
                class="user-button__avatar"
                icon="sprite-navbar navbar-user"
                size="medium" />
        </div>
        <NavigationBarUserSelectContent
            slot="selectContent"
            :avatar-id="user.avatar_id"
            :initials="userInitials"
            :email="user.email" />
    </NavigationBarSelectButton>
</template>

<script>
import { mapState } from 'vuex';
import { toCapitalize } from '~/model/stringOperations';

export default {
    name: 'NavigationBarUserButton',
    components: {
        NavigationBarSelectButton: () => import('~/components/Navigation/NavigationBar/NavigationBarSelectButton'),
        NavigationBarUserSelectContent: () => import('~/components/Navigation/NavigationBar/NavigationBarUserSelectContent'),
        Picture: () => import('~/components/Inputs/Image/Picture'),
        Icon: () => import('~/components/Icon/Icon'),
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        capitalizedUserFirstName() {
            const { first_name: firstName } = this.user;

            return toCapitalize(firstName);
        },
        capitalizedUserLastName() {
            const { last_name: lastName } = this.user;

            return toCapitalize(lastName);
        },
        userInitials() {
            return `${this.capitalizedUserFirstName} ${this.capitalizedUserLastName}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-image {
        width: 24px;
        height: 24px;

        & > img {
            object-fit: contain;
        }
    }
</style>
