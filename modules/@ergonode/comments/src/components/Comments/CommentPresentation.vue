/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Comment>
        <template #header>
            <div class="header__user">
                <UserFabAvatar
                    :avatar-id="avatarId"
                    :user-id="comment.user_id"
                    :name="comment.author"
                    :size="smallSize" />
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
                    :theme="destructiveTheme"
                    @click.native="onRemove">
                    <template #icon="{ color }">
                        <IconDelete :fill-color="color" />
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
                v-text="createdInfo" />
            <span
                v-if="comment.edited_at"
                class="comment-info"
                v-text="editedInfo" />
        </template>
    </Comment>
</template>
<script>
import Comment from '@Comments/components/Comments/Comment';
import UserFabAvatar from '@Core/components/Multimedia/UserFabAvatar';
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
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
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
        UserFabAvatar,
    },
    props: {
        comment: {
            type: Object,
            required: true,
        },
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        destructiveTheme() {
            return THEME.DESTRUCTIVE;
        },
        colorGreen() {
            return GREEN;
        },
        whiteColor() {
            return WHITE;
        },
        avatarId() {
            return this.comment.avatar_filename !== null ? this.comment.user_id : '';
        },
        isAbleToEdit() {
            return this.comment._links.edit;
        },
        isAbleToDelete() {
            return this.comment._links.delete;
        },
        createdInfo() {
            return this.$t('@Comments.comment.components.CommentPresentation.createdInfo', {
                date: this.formatDate(this.comment.created_at),
            });
        },
        editedInfo() {
            return this.$t('@Comments.comment.components.CommentPresentation.editedInfo', {
                date: this.formatDate(this.comment.edited_at),
            });
        },
    },
    methods: {
        ...mapActions('comment', [
            'removeComment',
        ]),
        editComment() {
            this.$emit('edit');
        },
        onRemove() {
            this.$confirm({
                type: MODAL_TYPE.DESTRUCTIVE,
                title: this.$t('@Comments.comment.components.CommentPresentation.deleteTitle'),
                applyTitle: this.$t('@Comments._.deleteConfirm'),
                cancelTitle: this.$t('@Comments._.cancel'),
                action: () => {
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
                message: this.$t('@Comments.comment.components.CommentPresentation.deleteSuccess'),
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
