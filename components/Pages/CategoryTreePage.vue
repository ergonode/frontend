/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateCategoryTree && isEdit"
            icon="Tree"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
        <Blur
            v-show="isBlurVisible"
            :style="blurZIndex" />
        <TrashCan v-show="draggedElementOnGrid" />
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
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
        let translationRoute = { name: 'category-tree-new-translations' };
        let designerRoute = { name: 'category-tree-new-designer' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Category trees',
                icon: 'Tree',
                route: { name: 'category-trees-grid' },
            },
        ];
        this.isUserAllowedToUpdateCategoryTree = this.$hasAccess('CATEGORY_TREE_UPDATE');
        if (this.isEdit) {
            generalRoute = { name: 'category-tree-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'category-tree-edit-id-translations', params: this.$route.params };
            designerRoute = { name: 'category-tree-edit-id-designer', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE CATEGORY TREE',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('CATEGORY_TREE_DELETE'),
                },
            ];
        }
        this.tabs = [
            {
                title: 'General options',
                route: generalRoute,
                active: true,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} TREE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategoryTree : false,
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
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategoryTree : false,
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
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategoryTree : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateCategoryTree;
        delete this.buttons;
    },
    computed: {
        ...mapState('draggable', {
            isListElementDragging: (state) => state.isListElementDragging,
            draggedElementOnGrid: (state) => state.draggedElementOnGrid,
        }),
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
