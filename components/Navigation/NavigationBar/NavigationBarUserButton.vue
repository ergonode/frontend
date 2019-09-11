/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton
        :title="capitalizedUserFirstName || capitalizedUserLastName"
        data-cy="user-select">
        <div
            slot="prependIcon"
            class="user-image">
            <Picture
                v-if="user.avatar_id"
                fab
                :image-id="user.avatar_id" />
            <IconUser
                v-else
                fill-color="#fff" />
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
import { toCapitalize } from '~/model/stringWrapper';

export default {
    name: 'NavigationBarUserButton',
    components: {
        NavigationBarSelectButton: () => import('~/components/Navigation/NavigationBar/NavigationBarSelectButton'),
        NavigationBarUserSelectContent: () => import('~/components/Navigation/NavigationBar/NavigationBarUserSelectContent'),
        Picture: () => import('~/components/Inputs/Image/Picture'),
        IconUser: () => import('~/components/Icon/Menu/IconUser'),
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
        display: flex;
        width: 24px;
        height: 24px;

        & > img {
            object-fit: contain;
            box-shadow:
                0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 3px 1px -2px rgba(0, 0, 0, 0.12),
                0 1px 5px 0 rgba(0, 0, 0, 0.2);
        }
    }
</style>
