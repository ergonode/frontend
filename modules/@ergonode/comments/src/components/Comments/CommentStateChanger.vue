/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="comment-list__element">
        <FadeTransition>
            <CommentEdit
                v-if="showEditingForm"
                :scope="scope"
                :errors="errors"
                :comment-value="comment.content"
                :comment-id="comment.id"
                @close="toggleState" />
            <CommentPresentation
                v-else
                :comment="comment"
                @edit="toggleState" />
        </FadeTransition>
    </li>
</template>
<script>
import CommentEdit from '@Comments/components/Comments/CommentEdit';
import CommentPresentation from '@Comments/components/Comments/CommentPresentation';

export default {
    name: 'CommentStateChanger',
    components: {
        CommentPresentation,
        CommentEdit,
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
        comment: {
            type: Object,
            default: () => ({}),
        },
        isAdditionFormVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showEditingForm: false,
        };
    },
    watch: {
        isAdditionFormVisible(newVal) {
            if (newVal === true) this.showEditingForm = false;
        },
    },
    methods: {
        toggleState() {
            this.showEditingForm = !this.showEditingForm;
            this.$emit('close');
        },
    },
};
</script>
<style lang="scss" scoped>
    .comment-list__element {
        margin: 24px 2px;
    }
</style>
