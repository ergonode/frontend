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
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'CategoryPage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Categories',
                    icon: 'Category',
                    path: '/categories',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/categories/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE CATEGORY' : 'CREATE CATEGORY',
                            action: this.isEdit ? this.onSave : this.onCreate,
                            disabled: this.isEdit ? !this.$canIUse('CATEGORY_UPDATE') : false,
                        },
                    },
                },
                {
                    title: 'Translations',
                    path: `/categories/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/translations`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE CATEGORY',
                            action: this.onSave,
                            disabled: !this.$canIUse('CATEGORY_UPDATE'),
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
            //         title: 'REMOVE CATEGORY',
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
