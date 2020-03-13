/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentWrapper>
        <template #header>
            <span
                class="font--medium-16-24"
                v-text="isEdit ? 'Edit comment' : 'Add new comment'" />
        </template>
        <template #content>
            <TextArea
                :value="content"
                solid
                label="Comment"
                resize="none"
                :required="true"
                :style="{height: '128px'}"
                :error-messages="errorCommentMessage"
                @input="setCommentValue" />
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
    </CommentWrapper>
</template>
<script>
import { mapActions } from 'vuex';
import { SIZE, THEME } from '@Core/defaults/theme';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';
import CommentWrapper from '@Comments/components/Comments/CommentWrapper';
import Button from '@Core/components/Buttons/Button';
import TextArea from '@Core/components/Inputs/TextArea';

export default {
    name: 'EditableComment',
    components: {
        CommentWrapper,
        Button,
        TextArea,
    },
    mixins: [errorValidationMixin],
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
        errorCommentMessage() {
            const placeholderIndex = 'content';
            return this.elementIsValidate(placeholderIndex);
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
