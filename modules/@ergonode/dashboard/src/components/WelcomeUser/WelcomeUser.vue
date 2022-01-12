/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="user-welcome">
        <UserFabAvatar
            :avatar-id="avatarId"
            :user-id="user.id"
            :name="user.firstName"
            :size="extraLargeSize" />
        <div class="user-welcome__description">
            <h1
                class="user-welcome__title"
                v-text="welcomeText" />
            <span
                class="user-welcome__subtitle"
                v-text="whatsGoingOnText" />
        </div>
    </div>
</template>

<script>
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapState,
} from 'vuex';

export default {
    name: 'WelcomeUser',
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
        extraLargeSize() {
            return SIZE.EXTRA_LARGE;
        },
        welcomeText() {
            return this.$t('@Dashboard.dashboard.components.WelcomeUser.welcome', {
                name: this.user.firstName,
            });
        },
        whatsGoingOnText() {
            return this.$t('@Dashboard.dashboard.components.WelcomeUser.question');
        },
    },

};
</script>

<style lang="scss" scoped>
    .user-welcome {
        display: flex;
        align-items: center;

        &__description {
            margin-left: 32px;
        }

        &__title, &__subtitle {
            color: $WHITE;
        }

        &__title {
            font: $FONT_SEMI_BOLD_40_48;
        }

        &__subtitle {
            margin-top: 4px;
            font: $FONT_MEDIUM_16_24;
        }
    }
</style>
