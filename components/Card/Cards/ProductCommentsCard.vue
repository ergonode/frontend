/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="comments-wrapper">
        <Transition
            name="fade"
            mode="out-in">
            <PrependIconButton
                v-if="!showAdditionForm"
                title="ADD COMMENT"
                :disabled="!$hasAccess('PRODUCT_UPDATE')"
                @click.native="toggleForm(false)">
                <template #prepend="{ color }">
                    <IconAdd
                        :fill-color="color" />
                </template>
            </PrependIconButton>
            <EditableComment
                v-if="showAdditionForm"
                :is-edit="false"
                @close="toggleForm" />
        </Transition>
        <TransitionGroup
            name="fade"
            mode="out-in">
            <CommentStateChanger
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                @edit="toggleForm"
            />
        </TransitionGroup>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import CommentStateChanger from '~/components/Comments/CommentStateChanger';
import EditableComment from '~/components/Comments/EditableComment';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductBaseCard',
    components: {
        PrependIconButton,
        IconAdd,
        CommentStateChanger,
        EditableComment,
    },
    data() {
        return {
            showAdditionForm: false,
        };
    },
    computed: {
        ...mapState('comments', {
            comments: (state) => state.comments,
        }),
    },
    mixins: [errorValidationMixin],
    methods: {
        toggleForm(isEdit) {
            if (isEdit) {
                this.showAdditionForm = false;
            } else {
                this.showAdditionForm = !this.showAdditionForm;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
    .comments-wrapper {
        padding: 24px;

        .fade-enter-active, .fade-leave-active {
            transition: opacity 0.3s;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>
