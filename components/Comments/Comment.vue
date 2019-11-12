/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="comment">
        <div class="comment__header">
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
        </div>
        <div class="comment__content font--medium-14-20">
            Lorem Ipsum is simply dummy text of.
        </div>
        <div class="comment__footer font--medium-12-16">
            <span>Created 12.3.1234 33:33</span>
            <span>Edited 12.5.1234 24:34</span>
        </div>
    </div>
</template>
<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import {
    GREEN, RED, WHITE,
} from '~/assets/scss/_variables/_colors.scss';

export default {
    name: 'Comment',
    components: {
        FabButton: () => import('~/components/Buttons/FabButton'),
        IconEdit: () => import('~/components/Icon/Actions/IconEdit'),
        IconDelete: () => import('~/components/Icon/Actions/IconDelete'),
        IconUser: () => import('~/components/Icon/Menu/IconUser'),
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
    .comment {
        display: flex;
        flex-direction: column;
        min-width: 556px;
        width: auto;
        max-width: 600px;
        padding: 24px;
        background-color: $WHITE;
        box-shadow: $ELEVATOR_2_DP;
        color: $GRAPHITE_DARK;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;

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
        }

        &__content {
            padding: 16px 0;
        }

        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: $GRAPHITE;
        }
    }
</style>
