/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateCategoryTree && isEdit"
            icon="Tree"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE CATEGORY TREE"
                    :disabled="!$hasAccess('CATEGORY_TREE_DELETE')"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryTreePage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        TrashCan: () => import('~/components/DragAndDrop/TrashCan'),
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalRoute = { name: 'category-tree-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Category trees',
                icon: 'Tree',
                route: { name: 'category-trees-grid' },
            },
        ];
        this.isUserAllowedToUpdateCategoryTree = this.$hasAccess('CATEGORY_TREE_UPDATE');
        if (this.isEdit) {
            const translationRoute = { name: 'category-tree-edit-id-translations', params: this.$route.params };
            const designerRoute = { name: 'category-tree-edit-id-designer', params: this.$route.params };

            generalRoute = { name: 'category-tree-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TREE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateCategoryTree,
                        },
                    },
                },
                {
                    title: 'Translations',
                    route: translationRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TREE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateCategoryTree,
                        },
                    },
                },
                {
                    title: 'Designer',
                    route: designerRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TREE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateCategoryTree,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TREE`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateCategoryTree;
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
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
                return { zIndex: '10' };
            }
            return null;
        },
    },
};
</script>
