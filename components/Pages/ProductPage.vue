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
            icon="Document"
            :is-read-only="!isUserAllowedToUpdateProduct && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'product-new-general' };
        let templateRoute = { name: 'product-new-template' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Products',
                icon: 'Document',
                route: { name: 'products-grid' },
            },
        ];


        this.isUserAllowedToUpdateProduct = this.$hasAccess('PRODUCT_UPDATE');

        if (this.isEdit) {
            generalRoute = { name: 'product-edit-id-general', params: this.$route.params };
            templateRoute = { name: 'product-edit-id-template', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE PRODUCT',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('PRODUCT_DELETE'),
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
                        title: `${buttonPrefix} PRODUCT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateProduct : false,
                    },
                },
            },
            {
                title: 'Product template',
                route: templateRoute,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} PRODUCT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateProduct : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateProduct;
        delete this.buttons;
    },
};
</script>
