/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentWrapper>
        <template #header>
            <div class="header__user">
                <div class="user__avatar">
                    <Picture
                        v-if="comment.avatar_id"
                        fab
                        :image-id="comment.avatar_id" />
                    <IconUser
                        v-else
                        size="32" />
                </div>
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
                v-text="comment.created_at" />
            <span
                v-if="comment.edited_at"
                class="font--medium-12-16"
                v-text="comment.edited_at" />
        </template>
    </CommentWrapper>
</template>
<script>
import { mapActions } from 'vuex';
import { THEMES, SIZES } from '~/defaults/buttons';
import {
    GREEN, RED, WHITE,
} from '~/assets/scss/_variables/_colors.scss';
import CommentWrapper from '~/components/Comments/CommentWrapper';
import FabButton from '~/components/Buttons/FabButton';
import IconEdit from '~/components/Icon/Actions/IconEdit';
import IconDelete from '~/components/Icon/Actions/IconDelete';
import IconUser from '~/components/Icon/Menu/IconUser';
import Picture from '~/components/Inputs/Image/Picture';

export default {
    name: 'Comment',
    components: {
        CommentWrapper,
        FabButton,
        IconEdit,
        IconDelete,
        IconUser,
        Picture,
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
            const { id } = this.comment;

            this.$emit('edit', true, id);
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
