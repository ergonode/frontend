/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Comment>
        <template #header>
            <span
                class="comment-header"
                v-text="isEdit ? 'Edit comment' : 'Add new comment'" />
        </template>
        <template #body>
            <FormValidatorField field-key="content">
                <template #validator="{ errorMessage }">
                    <TextArea
                        :value="content"
                        solid
                        label="Comment"
                        resize="none"
                        :required="true"
                        :style="{height: '128px'}"
                        :error-messages="errorMessage"
                        @input="setCommentValue" />
                </template>
            </FormValidatorField>
        </template>
        <template #footer>
            <Button
                :size="smallSize"
                :title="`${isEdit ? 'SAVE' : 'ADD'} COMMENT`"
                :disabled="$isLoading('commentButton')"
                @click.native="saveComment" />
            <Button
                :theme="secondaryTheme"
                :size="smallSize"
                title="CANCEL"
                @click.native="closeComment" />
        </template>
    </Comment>
</template>
<script>
import Comment from '@Comments/components/Comments/Comment';
import Button from '@Core/components/Buttons/Button';
import FormValidatorField from '@Core/components/Form/Field/FormValidatorField';
import TextArea from '@Core/components/Inputs/TextArea';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import { SIZE, THEME } from '@Core/defaults/theme';
import { mapActions } from 'vuex';

export default {
    name: 'CommentEdit',
    components: {
        Comment,
        Button,
        TextArea,
        FormValidatorField,
    },
    props: {
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
        };
    },
    computed: {
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        smallSize() {
            return SIZE.SMALL;
        },
    },
    methods: {
        ...mapActions('comments', [
            'createComment',
            'updateComment',
        ]),
        ...mapActions('validations', [
            'onError',
            'removeValidationErrors',
        ]),
        saveComment() {
            if (this.isEdit && this.commentId) {
                this.updateComment({
                    id: this.commentId,
                    content: this.content,
                    onSuccess: this.onSuccess,
                    onError: this.onError,
                });
            } else {
                this.createComment({
                    content: this.content,
                    onSuccess: this.onSuccess,
                    onError: this.onError,
                });
            }
        },
        onSuccess() {
            this.removeValidationErrors();
            this.$addAlert({ type: ALERT_TYPE.SUCCESS, message: `Comment ${this.isEdit ? 'edited' : 'created'}` });
            this.$emit('close');
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
