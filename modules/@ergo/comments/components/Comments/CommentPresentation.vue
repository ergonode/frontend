/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Comment>
        <template #header>
            <div class="header__user">
                <UserAvatar
                    :image-id="comment.avatar_id"
                    :name="comment.author"
                    :avatar-size="32" />
                <span v-text="comment.author" />
            </div>
            <div class="header__actions">
                <Fab
                    v-if="isAbleToEdit"
                    :theme="secondaryTheme"
                    @click.native="editComment">
                    <template #icon="{ color, isHovered }">
                        <IconEdit :fill-color="isHovered ? colorGreen : color" />
                    </template>
                </Fab>
                <Fab
                    v-if="isAbleToDelete"
                    :theme="secondaryTheme"
                    @click.native="onRemove">
                    <template #icon="{ color, isHovered }">
                        <IconDelete :fill-color="isHovered ? colorRed : color" />
                    </template>
                </Fab>
            </div>
        </template>
        <template #body>
            <span
                class="comment-content"
                v-text="comment.content" />
        </template>
        <template #footer>
            <span
                class="comment-info"
                v-text="`Created ${formatDate(comment.created_at)}`" />
            <span
                v-if="comment.edited_at"
                class="comment-info"
                v-text="`Edited ${formatDate(comment.edited_at)}`" />
        </template>
    </Comment>
</template>
<script>
import Comment from '@Comments/components/Comments/Comment';
import {
    GREEN,
    RED,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Fab from '@Core/components/Buttons/Fab';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import IconEdit from '@Core/components/Icons/Actions/IconEdit';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DEFAULT_DATA_HOUR_FORMAT,
} from '@Core/defaults/date';
import {
    MODAL_TYPE,
} from '@Core/defaults/modals';
import {
    THEME,
} from '@Core/defaults/theme';
import {
    format as formatDate,
} from 'date-fns';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CommentPresentation',
    components: {
        Comment,
        Fab,
        IconEdit,
        IconDelete,
        UserAvatar: () => import('@Core/components/Multimedia/UserAvatar'),
    },
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
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
        isAbleToEdit() {
            return this.comment._links.edit;
        },
        isAbleToDelete() {
            return this.comment._links.delete;
        },
    },
    methods: {
        ...mapActions('comments', [
            'removeComment',
        ]),
        editComment() {
            this.$emit('edit');
        },
        onRemove() {
            this.$openModal({
                key: MODAL_TYPE.GLOBAL_CONFIRM_MODAL,
                message: 'Are you sure you want to delete this comment?',
                confirmCallback: () => {
                    const {
                        id,
                    } = this.comment;

                    this.removeComment({
                        id,
                        onSuccess: this.onRemoveSuccess,
                        onError: this.onRemoveError,
                    });
                },
            });
        },
        onRemoveSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Comment removed',
            });
        },
        onRemoveError({
            message,
        }) {
            this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message,
            });
        },
        formatDate(date) {
            if (!date) return null;
            return formatDate(new Date(date), DEFAULT_DATA_HOUR_FORMAT);
        },
    },
};
</script>
<style lang="scss" scoped>
    .header__user {
        display: flex;
        align-items: center;
        font: $FONT_MEDIUM_16_24;

        .user-avatar {
            margin-right: 12px;
        }
    }

    .header__actions {
        display: flex;
        align-items: center;

        & > button {
            margin-left: 8px;
        }
    }

    .comment-content {
        font: $FONT_MEDIUM_14_20;
        white-space: pre-wrap;
    }

    .comment-info, .comment-content {
        font: $FONT_MEDIUM_12_16;
    }
</style>
