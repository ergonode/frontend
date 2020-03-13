/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentWrapper>
        <template #header>
            <div class="header__user">
                <UserAvatar
                    :image-id="comment.avatar_id"
                    :name="comment.author"
                    :avatar-size="32" />
                <span
                    class="font--medium-16-24"
                    v-text="comment.author" />
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
        <template #content>
            <span
                class="comment__content font--medium-14-20"
                v-text="comment.content" />
        </template>
        <template #footer>
            <span
                class="font--medium-12-16"
                v-text="`Created ${formatDate(comment.created_at)}`" />
            <span
                v-if="comment.edited_at"
                class="font--medium-12-16"
                v-text="`Edited ${formatDate(comment.edited_at)}`" />
        </template>
    </CommentWrapper>
</template>
<script>
import { mapActions } from 'vuex';
import { format as formatDate } from 'date-fns';
import { THEME } from '@Core/defaults/theme';
import { DEFAULT_DATA_HOUR_FORMAT } from '@Core/defaults/date';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import {
    GREEN, RED, WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import CommentWrapper from '@Comments/components/Comments/CommentWrapper';
import Fab from '@Core/components/Buttons/Fab';
import IconEdit from '@Core/components/Icons/Actions/IconEdit';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';

export default {
    name: 'Comment',
    components: {
        CommentWrapper,
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
            const isConfirm = confirm('Are you sure you want to delete this role?'); /* eslint-disable-line no-restricted-globals */
            if (isConfirm) {
                const { id } = this.comment;
                this.removeComment({
                    id,
                    onSuccess: this.onRemoveSuccess,
                    onError: this.onRemoveError,
                });
            }
        },
        onRemoveSuccess() {
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: 'Comment removed' });
        },
        onRemoveError({ message }) {
            this.$addAlert({ type: ALERT_TYPE.ERROR, message });
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

    .comment__content {
        white-space: pre-wrap;
    }
</style>
