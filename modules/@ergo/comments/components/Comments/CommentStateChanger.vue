/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li class="comment-list__element">
        <FadeTransition>
            <CommentEdit
                v-if="showEditingForm"
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
export default {
    name: 'CommentStateChanger',
    components: {
        CommentPresentation: () => import('@Comments/components/Comments/CommentPresentation'),
        CommentEdit: () => import('@Comments/components/Comments/CommentEdit'),
        FadeTransition: () => import('@Core/components/Transitions/FadeTransition'),
    },
    props: {
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
