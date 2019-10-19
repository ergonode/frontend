/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :buttons="buttons"
            :breadcrumbs="breadcrumbs"
            icon="Category"
            :is-read-only="!isUserAllowedToUpdateCategory && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'category-new-general' };
        let translationRoute = { name: 'category-new-translations' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Categories',
                icon: 'Category',
                route: { name: 'categories-grid' },
            },
        ];
        this.isUserAllowedToUpdateCategory = this.$hasAccess('CATEGORY_UPDATE');

        if (this.isEdit) {
            generalRoute = { name: 'category-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'category-edit-id-translations', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE CATEGORY',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('CATEGORY_DELETE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconDelete'),
                    },
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
                        title: `${buttonPrefix} CATEGORY`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategory : false,
                    },
                },
            },
            {
                title: 'Translations',
                route: translationRoute,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} CATEGORY`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategory : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateCategory;
        delete this.buttons;
    },
};
</script>
