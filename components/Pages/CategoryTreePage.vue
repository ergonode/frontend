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
    </PageWrapper>
</template>

<script>
import { mapState } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryTreePage',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        Blur: () => import('~/components/Blur/Blur'),
    },
    created() {
        let generalOptTabPath = '/category-trees/new/general';
        let translationTabPath = '/category-trees/new/translations';
        let designerPath = '/category-trees/new/designer';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Category trees',
                icon: 'Tree',
                path: '/category-trees',
            },
        ];
        this.isUserAllowedToUpdateCategoryTree = this.$hasAccess('CATEGORY_TREE_UPDATE');
        if (this.isEdit) {
            generalOptTabPath = `/category-trees/edit/${this.$route.params.id}/general`;
            translationTabPath = `/category-trees/edit/${this.$route.params.id}/translations`;
            designerPath = `/category-trees/edit/${this.$route.params.id}/designer`;
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
                path: generalOptTabPath,
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
                path: translationTabPath,
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
                path: designerPath,
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
            isListElementDragging: state => state.isListElementDragging,
        }),
        isBlurVisible() {
            return this.isListElementDragging;
        },
        blurZIndex() {
            if (this.isListElementDragging) {
                return { zIndex: '10' };
            }
            return null;
        },
    },
};
</script>
