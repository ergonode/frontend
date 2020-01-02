/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="header">
        <UserAvatar
            :image-id="avatarId"
            :name="initials"
            :avatar-size="64" />
        <span
            class="header__initials font--medium-16-24"
            v-text="initials" />
        <span
            class="header__email font--medium-12-16"
            v-text="email" />
    </div>
</template>

<script>
import { GRAPHITE } from '@Core/assets/scss/_variables/_colors.scss';

export default {
    name: 'NavigationBarUserSelectContentHeader',
    props: {
        initials: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatarId: {
            type: String,
            default: '',
        },
    },
    components: {
        UserAvatar: () => import('@Core/components/Multimedia/UserAvatar'),
    },
    computed: {
        graphiteColor() {
            return GRAPHITE;
        },
    },
};
</script>

<style lang="scss" scoped>
    .header {
        display: grid;
        grid-template-columns: 72px auto;
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
        }

        &__email {
            grid-row: 2;
            align-self: flex-start;
            color: $GREY_DARK;
        }

        .user-avatar {
            grid-row: 1 / 3;
        }
    }
</style>
