/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :is-navigation-back="true"
            :is-read-only="$isReadOnly('CATEGORY_TREE')"
            @navigateBack="onDismiss">
            <template
                v-if="isEdit"
                #mainAction>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY TREE"
                    :disabled="!$hasAccess(['CATEGORY_TREE_DELETE'])"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Footer>
            <Button
                :title="isEdit ? 'SAVE TREE' : 'CREATE TREE'"
                :loaded="$isLoaded('footerButton')"
                @click.native="onUpdate" />
        </Footer>
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '@Core/defaults/buttons';
import { Z_INDEX_LVL_0 } from '~/assets/scss/_variables/_indexes.scss';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryTreePage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        Blur: () => import('~/components/Blur/Blur'),
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
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
