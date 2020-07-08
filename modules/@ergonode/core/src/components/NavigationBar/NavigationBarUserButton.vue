/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <NavigationBarSelectButton
        data-cy="nav-bar-dropdown"
        @focus="onFocus">
        <template #input>
            <UserAvatar
                :image-id="user.avatarId"
                :name="user.firstName" />
            <span
                class="title"
                v-text="capitalizedUserFirstName || capitalizedUserLastName" />
            <div class="icon-wrapper">
                <IconArrowDropDown
                    :fill-color="whiteColor"
                    :state="arrowIconState" />
            </div>
        </template>
        <template #dropdown>
            <NavigationBarUserSelectContent
                :avatar-id="user.avatarId"
                :initials="userInitials"
                :email="user.email" />
        </template>
    </NavigationBarSelectButton>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import {
    ARROW,
} from '@Core/defaults/icons';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    mapState,
} from 'vuex';

export default {
    name: 'NavigationBarUserButton',
    components: {
        NavigationBarSelectButton: () => import('@Core/components/NavigationBar/NavigationBarSelectButton'),
        NavigationBarUserSelectContent: () => import('@Core/components/NavigationBar/NavigationBarUserSelectContent'),
        IconArrowDropDown: () => import('@Core/components/Icons/Arrows/IconArrowDropDown'),
        UserAvatar: () => import('@Core/components/Multimedia/UserAvatar'),
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        ...mapState('authentication', {
            user: state => state.user,
        }),
        whiteColor() {
            return WHITE;
        },
        arrowIconState() {
            return this.isFocused ? ARROW.UP : ARROW.DOWN;
        },
        capitalizedUserFirstName() {
            const {
                firstName,
            } = this.user;

            return toCapitalize(firstName);
        },
        capitalizedUserLastName() {
            const {
                lastName,
            } = this.user;

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
