/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Transition
        name="fade"
        mode="out-in">
        <EditableComment
            v-if="showEditingForm"
            :comment-value="comment.content"
            :comment-id="comment.id"
            @close="toggleState" />
        <Comment
            v-else
            :comment="comment"
            @edit="toggleState"
        />
    </Transition>
</template>
<script>
export default {
    name: 'CommentStateChanger',
    components: {
        Comment: () => import('~/components/Comments/Comment'),
        EditableComment: () => import('~/components/Comments/EditableComment'),
    },
    data() {
        return {
            showEditingForm: false,
        };
    },
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
    },
    methods: {
        toggleState(isEdit) {
            if (isEdit) {
                this.showEditingForm = !this.showEditingForm;
                this.$emit('edit', true);
            }
        },
    },
};
</script>
