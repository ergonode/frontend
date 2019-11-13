/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentWrapper>
        <template #header>
            <span
                class="font--medium-16-24"
                v-text="title" />
        </template>
        <template #content>
            <TextArea
                :value="comment"
                solid
                label="Comment"
                resize="none"
                :required="true"
                :style="{height: '128px'}"
                :error-messages="errorCommentMessage"
                :disabled="!isUserAllowedToUpdate"
                @input="setCommentValue" />
        </template>
        <template #footer>
            <BaseButton
                :size="smallSize"
                title="SAVE COMMENT"
                @click.native="saveComment" />
            <BaseButton
                :theme="secondaryTheme"
                :size="smallSize"
                title="CANCEL"
                @click.native="cancelComment" />
        </template>
    </CommentWrapper>
</template>
<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';
import CommentWrapper from '~/components/Comments/CommentWrapper';
import BaseButton from '~/components/Buttons/BaseButton';
import TextArea from '~/components/Inputs/TextArea';

export default {
    name: 'EditableComment',
    components: {
        CommentWrapper,
        BaseButton,
        TextArea,
    },
    mixins: [errorValidationMixin],
    props: {
        commentValue: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: 'Edit comment',
        },
    },
    data() {
        return {
            comment: this.commentValue,
        };
    },
    computed: {
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        smallSize() {
            return SIZES.SMALL;
        },
        isUserAllowedToUpdate() {
            return this.$hasAccess('PRODUCT_UPDATE');
        },
        errorCommentMessage() {
            const placeholderIndex = 'comment';
            return this.elementIsValidate(placeholderIndex);
        },
    },
    methods: {
        saveComment() {
            console.log('save');
        },
        cancelComment() {
            console.log('cancel');
        },
        setCommentValue(value) {
            this.comment = value;
        },
    },
};
</script>
