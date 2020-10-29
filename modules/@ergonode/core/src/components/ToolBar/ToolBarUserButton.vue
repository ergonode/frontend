/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ToolBarSelectButton
        data-cy="tool-bar-dropdown"
        @focus="onFocus">
        <template #input>
            <UserFabAvatar
                :avatar-id="avatarId"
                :user-id="user.id"
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
            <ToolBarUserSelectContent />
        </template>
    </ToolBarSelectButton>
</template>

<script>
import {
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import IconArrowDropDown from '@Core/components/Icons/Arrows/IconArrowDropDown';
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
import ToolBarSelectButton from '@Core/components/ToolBar/ToolBarSelectButton';
import ToolBarUserSelectContent from '@Core/components/ToolBar/ToolBarUserSelectContent';
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
    name: 'ToolBarUserButton',
    components: {
        ToolBarSelectButton,
        ToolBarUserSelectContent,
        IconArrowDropDown,
        UserFabAvatar,
    },
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        ...mapState('authentication', [
            'user',
        ]),
        avatarId() {
            return this.user.avatarFilename
                ? this.user.avatarFilename.split('.')[0]
                : '';
        },
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
