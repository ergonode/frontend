/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentWrapper>
        <template #header>
            <div class="header__user">
                <div class="user__avatar">
                    <!-- <Picture
                        v-if="comment.avatar_id"
                        fab
                        :image-id="comment.avatar_id" /> -->
                    <IconUser size="32" />
                </div>
                <span class="font--medium-16-24">
                    Bleto P
                </span>
            </div>
            <div class="header__actions">
                <FabButton
                    :theme="secondaryTheme"
                    :size="regularSize"
                    :hover-color="colorGreen"
                    @click.native="editComment">
                    <template #icon="{ color }">
                        <IconEdit :fill-color="color" />
                    </template>
                </FabButton>
                <FabButton
                    :theme="secondaryTheme"
                    :size="regularSize"
                    :hover-color="colorRed"
                    @click.native="deleteComment">
                    <template #icon="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </FabButton>
            </div>
        </template>
        <template #content>
            <span class="font--medium-14-20">
                Lorem Ipsum is simply dummy text of.
            </span>
        </template>
        <template #footer>
            <span class="font--medium-12-16">Created 12.3.1234 33:33</span>
            <span class="font--medium-12-16">Edited 12.5.1234 24:34</span>
        </template>
    </CommentWrapper>
</template>
<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import {
    GREEN, RED, WHITE,
} from '~/assets/scss/_variables/_colors.scss';
import CommentWrapper from '~/components/Comments/CommentWrapper';
import FabButton from '~/components/Buttons/FabButton';
import IconEdit from '~/components/Icon/Actions/IconEdit';
import IconDelete from '~/components/Icon/Actions/IconDelete';
import IconUser from '~/components/Icon/Menu/IconUser';

export default {
    name: 'Comment',
    components: {
        CommentWrapper,
        FabButton,
        IconEdit,
        IconDelete,
        IconUser,
        // Picture: () => import('~/components/Inputs/Image/Picture'),
    },
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        regularSize() {
            return SIZES.REGULAR;
        },
        colorGreen() {
            return GREEN;
        },
        colorRed() {
            return RED;
        },
        whiteColor() {
            return WHITE;
        },
    },
    methods: {
        editComment() {
            console.log('edit');
        },
        deleteComment() {
            console.log('delete');
        },
    },
};
</script>
<style lang="scss" scoped>
    .header__user {
        display: flex;
        align-items: center;

        .user__avatar {
            padding-right: 12px;
            display: flex;
            width: 32px;
            height: 32px;

            & > svg {
                border-radius: 16px;
                object-fit: contain;
            }
        }
    }

    .header__actions {
        display: flex;
        align-items: center;

        & > button {
            margin-left: 8px;
        }
    }
</style>
