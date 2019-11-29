/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton
        data-cy="user-select"
        @focus="onFocus">
        <template #input>
            <UserPicture :image-id="user.avatar_id" />
            <span
                class="title"
                v-text="capitalizedUserFirstName || capitalizedUserLastName" />
            <div class="icon-wrapper">
                <IconArrowDropDown
                    :fill-color="whiteColor"
                    :state="arrowIconState" />
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
import { WHITE } from '~/assets/scss/_variables/_colors.scss';
import { toCapitalize } from '~/model/stringWrapper';
import { ARROW } from '~/defaults/icons';

export default {
    name: 'NavigationBarUserButton',
    components: {
        NavigationBarSelectButton: () => import('~/core/components/NavigationBar/NavigationBarSelectButton'),
        NavigationBarUserSelectContent: () => import('~/components/NavigationBar/NavigationBarUserSelectContent'),
        IconArrowDropDown: () => import('~/components/Icon/Arrows/IconArrowDropDown'),
        UserPicture: () => import('~/components/Multimedia/UserPicture'),
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            user: (state) => state.user,
        }),
        whiteColor() {
            return WHITE;
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
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
    methods: {
        onFocus(isFocused) {
            this.isFocused = isFocused;
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon-wrapper {
        display: flex;
        margin-right: -8px;
    }

    .title {
        color: $WHITE;
        font: $FONT_SEMI_BOLD_14_20;
        margin-left: 8px;
    }
</style>
