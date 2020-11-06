/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tool-bar-user-select-content-header">
        <UserFabAvatar
            :avatar-id="avatarId"
            :user-id="user.id"
            :name="initials"
            :size="largeSize" />
        <span
            class="tool-bar-user-select-content-header__initials"
            v-text="initials" />
        <span
            class="tool-bar-user-select-content-header__email"
            v-text="user.email" />
    </div>
</template>

<script>
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    toCapitalize,
} from '@Core/models/stringWrapper';
import {
    GRAPHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    mapState,
} from 'vuex';

export default {
    name: 'ToolBarUserSelectContentHeader',
    components: {
        UserFabAvatar,
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
        largeSize() {
            return SIZE.LARGE;
        },
        graphiteColor() {
            return GRAPHITE;
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
        initials() {
            return `${this.capitalizedUserFirstName} ${this.capitalizedUserLastName}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    .tool-bar-user-select-content-header {
        display: grid;
        grid-template-columns: 64px auto;
        grid-column-gap: 24px;
        align-items: center;
        margin: 24px;

        &__initials, &__email {
            grid-column: 2;
            text-align: left;
        }

        &__initials {
            grid-row: 1;
            align-self: flex-end;
            color: $GRAPHITE_DARK;
            letter-spacing: 0.1px;
            font: $FONT_MEDIUM_16_24;
        }

        &__email {
            grid-row: 2;
            align-self: flex-start;
            color: $GREY_DARK;
            font: $FONT_MEDIUM_12_16;
        }

        .user-avatar {
            grid-row: 1 / 3;
        }
    }
</style>
