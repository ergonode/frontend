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
            icon="sprite-menu menu-user--selected"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserPage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Users',
                    icon: 'sprite-menu menu-user--deactive',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/users/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE USER' : 'CREATE USER',
                            action: this.isEdit ? this.onSave : this.onCreate,
                        },
                    },
                },
                {
                    title: 'Avatar',
                    path: `/users/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/avatar`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE AVATAR',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
    created() {
        if (this.isEdit) {
            this.buttons = [
                {
                    title: 'REMOVE USER',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'sprite-system system-trash--deactive',
                },
            ];
        }
    },
};
</script>
