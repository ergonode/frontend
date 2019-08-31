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
            :is-read-only="!isUserAllowedToUpdateUser && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalOptTabPath = '/users/new/general';
        let avatarTabPath = '/users/new/avatar';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Users',
                icon: 'User',
                path: '/users',
            },
        ];
        this.isUserAllowedToUpdateUser = this.$hasAccess('USER_UPDATE');

        if (this.isEdit) {
            generalOptTabPath = `/users/edit/${this.$route.params.id}/general`;
            avatarTabPath = `/users/edit/${this.$route.params.id}/avatar`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            // TODO: Add when it's implemented on BE
            // this.buttons = [
            //     {
            //         title: 'REMOVE USER',
            //         color: 'transparent',
            //         action: this.onRemove,
            //         theme: 'dark',
            //         disabled: !this.$hasAccess('USER_DELETE'),
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
                        title: `${buttonPrefix} USER`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateUser : false,
                    },
                },
            },
            {
                title: 'Avatar',
                path: avatarTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} USER`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateUser : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateUser;
        delete this.buttons;
    },
};
</script>
