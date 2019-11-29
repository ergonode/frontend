/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="user-avatar"
        :style="avatarStyles">
        <Picture
            v-if="imageId"
            fab
            :image-id="imageId" />
        <span
            v-else
            class="user-avatar__placeholder font--medium-14-20"
            v-text="avatarInitial" />
    </div>
</template>

<script>
export default {
    name: 'UserAvatar',
    components: {
        Picture: () => import('~/core/components/Multimedia/Picture'),
    },
    props: {
        imageId: {
            type: String,
            default: '',
        },
        userName: {
            type: String,
            default: '',
        },
        pictureSize: {
            type: Number,
            default: 24,
        },
    },
    computed: {
        avatarInitial() {
            return this.userName.length ? this.userName[0] : '';
        },
        avatarStyles() {
            return {
                width: `${this.pictureSize}px`,
                height: `${this.pictureSize}px`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $WHITE;
        border-radius: 50%;
        box-shadow: $ELEVATOR_2_DP;

        &__placeholder {
            color: $GRAPHITE_DARK;
            text-transform: uppercase;
        }
    }
</style>
