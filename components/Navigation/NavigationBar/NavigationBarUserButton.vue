/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton
        :title="capitalizedUserFirstName || capitalizedUserLastName"
        data-cy="user-select">
        <template #prependIcon>
            <div class="user-image">
                <Picture
                    v-if="user.avatar_id"
                    fab
                    :image-id="user.avatar_id" />
                <IconUser
                    v-else
                    :fill-color="whiteColor" />
            </div>
        </template>
        <template #selectContent>
            <NavigationBarUserSelectContent
                :avatar-id="user.avatar_id"
                :initials="userInitials"
                :email="user.email" />
        </template>
    </NavigationBarSelectButton>
</template>

<script>
import { mapState } from 'vuex';
import { toCapitalize } from '~/model/stringWrapper';
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

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
            user: (state) => state.user,
        }),
        whiteColor() {
            return WHITE;
        },
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
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
