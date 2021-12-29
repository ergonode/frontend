/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CommentsList :is-placeholder="isPlaceholderVisible">
        <template #header>
            <Button
                v-if="!showForm && commentList.length > 0"
                :title="$t('@Comments.comment.components.CommentsForm.addButton')"
                :disabled="disabled"
                :size="smallSize"
                @click.native="openForm">
                <template #prepend="{ color }">
                    <IconAdd :fill-color="color" />
                </template>
            </Button>
            <CommentEdit
                v-if="showForm"
                :scope="scope"
                :errors="errors"
                :is-edit="false"
                @close="closeForm" />
        </template>
        <template #content>
            <CommentStateChanger
                v-for="comment in commentList"
                :key="comment.id"
                :scope="scope"
                :errors="errors"
                :is-addition-form-visible="showForm"
                :comment="comment"
                @close="closeForm" />
        </template>
        <template #placeholder>
            <TabBarNoDataPlaceholder
                :title="noDataTitleDefautl"
                :subtitle="noDataPlaceholder">
                <template #action>
                    <Button
                        :title="$t('@Comments.comment.components.CommentsForm.addButton')"
                        :disabled="disabled"
                        :size="smallSize"
                        @click.native="openForm">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </Button>
                </template>
            </TabBarNoDataPlaceholder>
        </template>
        <template
            v-if="isMoreButtonVisible"
            #footer>
            <Button
                :title="showMoreText"
                @click.native="showMore">
                <template
                    v-if="isFetchingData"
                    #append="{ color }">
                    <IconSpinner :fill-color="color" />
                </template>
            </Button>
        </template>
    </CommentsList>
</template>

<script>
import CommentEdit from '@Comments/components/Comments/CommentEdit';
import CommentStateChanger from '@Comments/components/Comments/CommentStateChanger';
import CommentsList from '@Comments/components/List/CommentsList';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'CommentsForm',
    components: {
        CommentsList,
        CommentStateChanger,
        CommentEdit,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        noDataTitle: {
            type: String,
            default: '',
        },
        noDataPlaceholder: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showForm: false,
            isFetchingData: false,
        };
    },
    computed: {
        ...mapState('comment', {
            objectId: state => state.objectId,
            fullListCount: state => state.count,
            commentList: state => state.comments,
            currentPage: state => state.currentPage,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        noDataTitleDefautl() {
            return this.noDataTitle !== ''
                ? this.noDataTitle
                : this.$t('@Comments.comment.components.CommentsForm.noDataTitle');
        },
        noDataPlaceholderDefault() {
            return this.noDataPlaceholder !== ''
                ? this.noDataPlaceholder
                : this.$t('@Comments.comment.components.CommentsForm.noDataPlaceholder');
        },
        showMoreText() {
            const {
                length: listLength,
            } = this.commentList;

            return this.$t('@Comments.comment.components.CommentsForm.showMore', {
                nr: (this.fullListCount - listLength),
            });
        },
        isPlaceholderVisible() {
            return !this.commentList.length && !this.showForm;
        },
        isMoreButtonVisible() {
            const {
                length: listLength,
            } = this.commentList;

            return listLength
                && listLength < this.fullListCount
                && this.fullListCount > DATA_LIMIT;
        },
    },
    methods: {
        ...mapActions('comment', [
            'getMoreComments',
        ]),
        closeForm() {
            this.showForm = false;
        },
        openForm() {
            this.showForm = true;
        },
        async showMore() {
            this.isFetchingData = true;

            const params = {
                limit: DATA_LIMIT,
                offset: this.currentPage * DATA_LIMIT,
                filter: `owner_id=${this.objectId}`,
                field: 'created_at',
            };

            await this.getMoreComments({
                params,
                onError: () => {
                    this.$addAlert({
                        type: ALERT_TYPE.ERROR,
                        message: this.$t('@Comments.comment.components.CommentsForm.getRequest'),
                    });
                },
            });

            this.isFetchingData = false;
        },
    },
};
</script>
