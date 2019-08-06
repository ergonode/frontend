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
            icon="User"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserRolesPage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Users/Roles',
                    icon: 'User',
                    path: '/users/roles',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/users/roles/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE ROLE' : 'CREATE ROLE',
                            action: this.isEdit ? this.onSave : this.onCreate,
                        },
                    },
                },
                {
                    title: 'Privileges',
                    path: `/users/roles/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/privileges`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE PRIVILEGES',
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
                    title: 'REMOVE ROLE',
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
