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
        let generalOptTabPath = '/categories/category/new/general';
        let privilegesTabPath = '/categories/category/new/translations';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Categories',
                icon: 'Category',
                path: '/categories',
            },
        ];
        this.isUserAllowedToUpdateCategory = this.$hasAccess('CATEGORY_UPDATE');

        if (this.isEdit) {
            generalOptTabPath = `/categories/category/edit/${this.$route.params.id}/general`;
            privilegesTabPath = `/categories/category/edit/${this.$route.params.id}/translations`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE CATEGORY',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('CATEGORY_DELETE'),
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
                        title: `${buttonPrefix} CATEGORY`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateCategory : false,
                    },
                },
            },
            {
                title: 'Translations',
                path: privilegesTabPath,
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
