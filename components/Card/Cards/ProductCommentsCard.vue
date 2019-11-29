/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentsList :is-placeholder="!!commentList.length">
        <template #header>
            <PrependIconButton
                v-if="!showForm"
                title="NEW COMMENT"
                :disabled="!$hasAccess(['PRODUCT_UPDATE'])"
                @click.native="openForm">
                <template #prepend="{ color }">
                    <IconAdd
                        :fill-color="color" />
                </template>
            </PrependIconButton>
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
                bg-url="placeholders/comments.svg" />
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
import { DATA_LIMIT } from '~/defaults/grid';
import { LayoutOrientation } from '~/defaults/layout';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import Button from '~/core/components/Buttons/Button';
import Loader from '~/components/Loader/Loader';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import CommentsList from '~/components/List/Comments/CommentsList';
import CommentStateChanger from '~/components/Comments/CommentStateChanger';
import EditableComment from '~/components/Comments/EditableComment';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductCommentsCard',
    components: {
        PrependIconButton,
        Button,
        Loader,
        IconAdd,
        CommentsList,
        CommentStateChanger,
        EditableComment,
        ListPlaceholder: () => import('~/components/Placeholder/ListPlaceholder'),
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
