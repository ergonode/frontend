/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div
        class="user-picture"
        :style="{ width: `${pictureSize}px`, height: `${pictureSize}px`}">
        <Picture
            v-if="imageId"
            fab
            :image-id="imageId" />
        <IconUser
            v-else
            :fill-color="placeholderPictureColor"
            :size="pictureSize" />
    </div>
</template>

<script>
import { WHITE } from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'UserPicture',
    components: {
        Picture: () => import('~/core/components/Multimedia/Picture'),
        IconUser: () => import('~/components/Icon/Menu/IconUser'),
    },
    props: {
        imageId: {
            type: String,
            default: '',
        },
        pictureSize: {
            type: Number,
            default: 24,
        },
        placeholderPictureColor: {
            type: String,
            default: WHITE,
        },
    },
};
</script>

<style lang="scss" scoped>
    .user-picture {
        display: flex;

        & > img {
            object-fit: contain;
            box-shadow: $ELEVATOR_2_DP;
        }
    }
</style>
