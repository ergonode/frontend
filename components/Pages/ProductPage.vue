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
        let generalOptTabPath = '/products/new/general';
        let templateTabPath = '/products/new/template';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Products',
                icon: 'Document',
                path: '/products',
            },
        ];


        this.isUserAllowedToUpdateProduct = this.$hasAccess('PRODUCT_UPDATE');

        if (this.isEdit) {
            generalOptTabPath = `/products/edit/${this.$route.params.id}/general`;
            templateTabPath = `/products/edit/${this.$route.params.id}/template`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            // TODO: uncomment when we create removal options
            // this.buttons = [
            //     {
            //         title: 'REMOVE PRODUCT',
            //         color: 'transparent',
            //         action: this.onRemove,
            //         theme: 'dark',
            //         icon: 'sprite-system system-trash--deactive',
            //     },
            // ];
        }

        this.tabs = [
            {
                title: 'General options',
                path: generalOptTabPath,
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
                path: templateTabPath,
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
