/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Comment>
        <template #header>
            <span
                class="comment-header"
                v-text="headerName" />
        </template>
        <template #body>
            <TextArea
                :value="content"
                :label="$t('@Comments.comment.components.CommentEdit.label')"
                resize="none"
                :required="true"
                height="128px"
                :error-messages="errors.content"
                @input="setCommentValue" />
        </template>
        <template #footer>
            <Button
                :size="smallSize"
                :title="buttonTitle"
                @click.native="saveComment">
                <template
                    v-if="isSubmitting"
                    #append="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
            <Button
                :theme="secondaryTheme"
                :size="smallSize"
                :title="$t('@Comments._.cancel')"
                @click.native="closeComment" />
        </template>
    </Comment>
</template>
<script>
import Comment from '@Comments/components/Comments/Comment';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'CommentEdit',
    components: {
        Comment,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        commentValue: {
            type: String,
            default: '',
        },
        commentId: {
            type: String,
            default: null,
        },
        isEdit: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            content: this.commentValue,
            isSubmitting: false,
        };
    },
    computed: {
        headerName() {
            return this.isEdit
                ? this.$t('@Comments.comment.components.CommentEdit.headerEdit')
                : this.$t('@Comments.comment.components.CommentEdit.headerAdd');
        },
        buttonTitle() {
            return this.isEdit
                ? this.$t('@Comments.comment.components.CommentEdit.buttonEdit')
                : this.$t('@Comments.comment.components.CommentEdit.buttonAdd');
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('comment', [
            'createComment',
            'updateComment',
        ]),
        ...mapActions('feedback', [
            'onError',
            'removeScopeErrors',
        ]),
        saveComment() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);

            if (this.isEdit && this.commentId) {
                this.updateComment({
                    id: this.commentId,
                    scope: this.scope,
                    content: this.content,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            } else {
                this.createComment({
                    scope: this.scope,
                    content: this.content,
                    onSuccess: this.onUpdateSuccess,
                    onError: this.onUpdateError,
                });
            }
        },
        onUpdateSuccess() {
            this.isSubmitting = false;
            const message = this.isEdit
                ? this.$t('@Comments.comment.components.CommentEdit.messageEdit')
                : this.$t('@Comments.comment.components.CommentEdit.messageAdd');

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message,
            });
            this.$emit('close');
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
        closeComment() {
            this.$emit('close');
        },
        setCommentValue(value) {
            this.content = value;
        },
    },
};
</script>

<style lang="scss" scoped>
    .comment-header {
        font: $FONT_MEDIUM_16_24;
    }
</style>
