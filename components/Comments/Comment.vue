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
                <FabButton
                    v-if="isAbleToEdit"
                    :theme="secondaryTheme"
                    :size="regularSize"
                    :hover-color="colorGreen"
                    @click.native="editComment">
                    <template #icon="{ color }">
                        <IconEdit :fill-color="color" />
                    </template>
                </FabButton>
                <FabButton
                    v-if="isAbleToDelete"
                    :theme="secondaryTheme"
                    :size="regularSize"
                    :hover-color="colorRed"
                    @click.native="onRemove">
                    <template #icon="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </FabButton>
            </div>
        </template>
        <template #content>
            <span
                class="font--medium-14-20"
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
import { THEMES, SIZES } from '~/defaults/buttons';
import { COMMENT_FORMAT } from '~/defaults/date';
import {
    GREEN, RED, WHITE,
} from '~/assets/scss/_variables/_colors.scss';
import CommentWrapper from '~/components/Comments/CommentWrapper';
import FabButton from '~/core/components/Buttons/FabButton';
import IconEdit from '~/components/Icon/Actions/IconEdit';
import IconDelete from '~/components/Icon/Actions/IconDelete';

export default {
    name: 'Comment',
    components: {
        CommentWrapper,
        FabButton,
        IconEdit,
        IconDelete,
        UserAvatar: () => import('~/components/Multimedia/UserAvatar'),
    },
    props: {
        comment: {
            type: Object,
            required: true,
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
            this.$addAlert({ type: 'success', message: 'Comment removed' });
        },
        onRemoveError({ message }) {
            this.$addAlert({ type: 'error', message });
        },
        formatDate(date) {
            if (!date) return null;

            return formatDate(new Date(date), COMMENT_FORMAT);
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
</style>
