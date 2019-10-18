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
        let generalRoute = { name: 'user-new-general' };
        let avatarRoute = {};
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Users',
                icon: 'User',
                route: { name: 'users-grid' },
            },
        ];
        this.isUserAllowedToUpdateUser = this.$hasAccess('USER_UPDATE');

        if (this.isEdit) {
            generalRoute = { name: 'user-edit-id-general', params: this.$route.params };
            avatarRoute = { name: 'user-edit-id-avatar', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            // TODO: Add when it's implemented on BE
            // this.buttons = [
            //     {
            //         title: 'REMOVE USER',
            //         action: this.onRemove,
            //         theme: 'secondary',
            //         disabled: !this.$hasAccess('USER_DELETE'),
            //         prepend: {
            //             component: () => import('~/components/Icon/Actions/IconDelete'),
            //         },
            //     },
            // ];
        }

        this.tabs = [
            {
                title: 'General options',
                route: generalRoute,
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
                route: avatarRoute,
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
