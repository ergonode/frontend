/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="comment-list__element">
        <FadeTransition>
            <EditableComment
                v-if="showEditingForm"
                :comment-value="comment.content"
                :comment-id="comment.id"
                @close="toggleState" />
            <Comment
                v-else
                :comment="comment"
                @edit="toggleState" />
        </FadeTransition>
    </li>
</template>
<script>
export default {
    name: 'CommentStateChanger',
    components: {
        Comment: () => import('~/components/Comments/Comment'),
        EditableComment: () => import('~/components/Comments/EditableComment'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
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
        isAdditionFormVisible: {
            type: Boolean,
            default: false,
        },
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
