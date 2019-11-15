/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridList :is-placeholder="!!commentList.length">
        <template #header>
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
        </template>
        <template #content>
            <CommentStateChanger
                v-for="comment in commentList"
                :key="comment.id"
                :comment="comment"
                @close="closeForm" />
        </template>
        <template
            v-if="isMoreButtonVisible"
            #footer>
            <Loader v-if="loading" />
            <BaseButton
                :title="showMoreText"
                @click.native="showMore" />
        </template>
    </GridList>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LIMIT } from '~/defaults/gridList';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import BaseButton from '~/components/Buttons/BaseButton';
import Loader from '~/components/Loader/Loader';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import GridList from '~/components/GridList/GridList';
import CommentStateChanger from '~/components/Comments/CommentStateChanger';
import EditableComment from '~/components/Comments/EditableComment';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductBaseCard',
    components: {
        PrependIconButton,
        BaseButton,
        Loader,
        IconAdd,
        GridList,
        CommentStateChanger,
        EditableComment,
    },
    data() {
        return {
            showAdditionForm: false,
            loading: false,
        };
    },
    computed: {
        ...mapState('comments', {
            objectId: (state) => state.objectId,
            fullListCount: (state) => state.count,
            commentList: (state) => state.comments,
            currentPage: (state) => state.currentPage,
        }),
        showMoreText() {
            const { length: listLength } = this.commentList;

            return `LOAD MORE COMMENTS (${this.fullListCount - listLength})`;
        },
        isMoreButtonVisible() {
            const { length: listLength } = this.commentList;

            return listLength
                && listLength < this.fullListCount
                && this.fullListCount > LIMIT;
        },
    },
    mixins: [errorValidationMixin],
    methods: {
        ...mapActions('comments', [
            'getMoreComments',
        ]),
        closeForm() {
            this.showAdditionForm = false;
        },
        toggleForm() {
            this.showAdditionForm = !this.showAdditionForm;
        },
        showMore() {
            const params = {
                limit: LIMIT,
                offset: this.currentPage * LIMIT,
                filter: `owner_id=${this.objectId}`,
                field: 'created_at',
            };

            this.loading = true;
            this.getMoreComments({
                params,
                onSuccess: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>
