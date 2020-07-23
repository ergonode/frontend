/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div :class="avatarClasses">
        <Picture
            v-if="imageId"
            :value="imageId"
            fab />
        <span
            v-else
            v-text="avatarInitial" />
    </div>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';

export default {
    name: 'UserAvatar',
    components: {
        Picture: () => import('@Core/components/Multimedia/Picture'),
    },
    props: {
        imageId: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: SIZE.TINY,
            validator: value => Object.values(SIZE).indexOf(value) !== -1,
        },
    },
    computed: {
        avatarInitial() {
            return this.name.length ? this.name[0] : '';
        },
        avatarClasses() {
            return [
                'user-avatar',
                `user-avatar--${this.size}`,
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-avatar {
        display: flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        color: $GRAPHITE_DARK;
        border-radius: 50%;
        text-transform: uppercase;

        &--tiny {
            width: 24px;
            height: 24px;
            font: $FONT_MEDIUM_12_16;
        }

        &--small {
            width: 32px;
            height: 32px;
            font: $FONT_MEDIUM_14_20;
        }

        &--regular {
            width: 40px;
            height: 40px;
            font: $FONT_MEDIUM_16_24;
        }

        &--large {
            width: 64px;
            height: 64px;
            font: $FONT_SEMI_BOLD_24_32;
        }

        &--extra-large {
            width: 96px;
            height: 96px;
            font: $FONT_SEMI_BOLD_40_48;
        }
    }
</style>
