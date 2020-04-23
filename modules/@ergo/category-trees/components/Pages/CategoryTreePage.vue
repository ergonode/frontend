/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('CATEGORY_TREE')">
            <template #mainAction>
                <Button
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY TREE"
                    :disabled="!$hasAccess(['CATEGORY_TREE_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer flex-end>
            <Button
                title="SAVE TREE"
                :size="smallSize"
                :disabled="$isLoading('footerButton')"
                @click.native="onSave" />
        </Footer>
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { Z_INDEX_LVL_0 } from '@Core/assets/scss/_js-variables/indexes.scss';
import categoryManagementPageMixin from '@Core/mixins/page/categoryManagementPageMixin';

export default {
    name: 'CategoryTreePage',
    components: {
        Blur: () => import('@Core/components/Blur/Blur'),
    },
    mixins: [categoryManagementPageMixin],
    computed: {
        ...mapState('draggable', {
            isListElementDragging: state => state.isListElementDragging,
            draggedElementOnGrid: state => state.draggedElementOnGrid,
        }),
        isBlurVisible() {
            return this.isListElementDragging || this.draggedElementOnGrid;
        },
        blurZIndex() {
            if (this.isBlurVisible) {
                return { zIndex: Z_INDEX_LVL_0 };
            }
            return null;
        },
    },
};
</script>
