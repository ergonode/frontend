/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="comments-wrapper">
        <PrependIconButton
            title="ADD COMMENT"
            :disabled="!$hasAccess('PRODUCT_UPDATE')"
            @click.native="addNewComment">
            <template #prepend="{ color }">
                <IconAdd
                    :fill-color="color" />
            </template>
        </PrependIconButton>
        <Comment />
        <EditableComment comment-value="yyyyyyyyyyy" />
    </div>
</template>

<script>
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import errorValidationMixin from '~/mixins/validations/errorValidationMixin';

export default {
    name: 'ProductBaseCard',
    components: {
        PrependIconButton,
        IconAdd,
        Comment: () => import('~/components/Comments/Comment'),
        EditableComment: () => import('~/components/Comments/EditableComment'),
    },
    mixins: [errorValidationMixin],
    methods: {
        addNewComment() {
            console.log('new');
        },
    },
};
</script>
<style lang="scss" scoped>
    .comments-wrapper {
        padding: 24px;
    }
</style>
