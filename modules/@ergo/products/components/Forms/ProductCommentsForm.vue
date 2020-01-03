/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentsList :is-placeholder="!!commentList.length">
        <template #header>
            <Button
                v-if="!showForm"
                title="NEW COMMENT"
                :disabled="!$hasAccess(['PRODUCT_UPDATE'])"
                @click.native="openForm">
                <template #prepend="{ color }">
                    <IconAdd
                        :fill-color="color" />
                </template>
            </Button>
            <EditableComment
                v-if="showForm"
                :is-edit="false"
                @close="closeForm" />
        </template>
        <template #content>
            <CommentStateChanger
                v-for="comment in commentList"
                :key="comment.id"
                :is-addition-form-visible="showForm"
                :comment="comment"
                @close="closeForm" />
        </template>
        <template #placeholder>
            <ListPlaceholder
                :layout-orientation="horizontalOrientation"
                title="Nothing to see here"
                subtitle="Here you can share information about the product with other people"
                :bg-url="require('@Core/assets/images/placeholders/comments.svg')" />
        </template>
        <template
            v-if="isMoreButtonVisible"
            #footer>
            <Loader v-if="!$isLoaded('moreComments')" />
            <Button
                :title="showMoreText"
                @click.native="showMore" />
        </template>
    </CommentsList>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { DATA_LIMIT } from '@Core/defaults/grid';
import { LayoutOrientation } from '@Core/defaults/layout';
import Button from '@Core/components/Buttons/Button';
import Loader from '@Core/components/Loader/Loader';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import CommentsList from '@Comments/components/List/CommentsList';
import CommentStateChanger from '@Comments/components/Comments/CommentStateChanger';
import EditableComment from '@Comments/components/Comments/EditableComment';
import errorValidationMixin from '@Core/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductCommentsForm',
    components: {
        Button,
        Loader,
        IconAdd,
        CommentsList,
        CommentStateChanger,
        EditableComment,
        ListPlaceholder: () => import('@Core/components/List/ListPlaceholder'),
    },
    data() {
        return {
            showForm: false,
        };
    },
    computed: {
        ...mapState('comments', {
            objectId: (state) => state.objectId,
            fullListCount: (state) => state.count,
            commentList: (state) => state.comments,
            currentPage: (state) => state.currentPage,
        }),
        horizontalOrientation() {
            return LayoutOrientation.HORIZONTAL;
        },
        showMoreText() {
            const { length: listLength } = this.commentList;

            return `LOAD MORE COMMENTS (${this.fullListCount - listLength})`;
        },
        isMoreButtonVisible() {
            const { length: listLength } = this.commentList;

            return listLength
                && listLength < this.fullListCount
                && this.fullListCount > DATA_LIMIT;
        },
    },
    mixins: [errorValidationMixin],
    methods: {
        ...mapActions('comments', [
            'getMoreComments',
        ]),
        closeForm() {
            this.showForm = false;
        },
        openForm() {
            this.showForm = true;
        },
        showMore() {
            const params = {
                limit: DATA_LIMIT,
                offset: this.currentPage * DATA_LIMIT,
                filter: `owner_id=${this.objectId}`,
                field: 'created_at',
            };

            this.getMoreComments({
                params,
            });
        },
    },
};
</script>
