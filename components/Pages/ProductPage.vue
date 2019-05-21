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
            icon="sprite-menu menu-paper--selected"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductPage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Products',
                    icon: 'sprite-menu menu-paper--selected',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/products/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE PRODUCT' : 'CREATE PRODUCT',
                            action: this.isEdit ? this.onSave : this.onCreate,
                        },
                    },
                },
                {
                    title: 'Product template',
                    path: `/products/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/template`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE PRODUCT',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
    created() {
        if (this.isEdit) {
            // uncomment when we create removal options
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
    },
};
</script>
