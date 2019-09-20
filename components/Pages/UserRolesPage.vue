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
            :is-read-only="!isUserAllowedToUpdateRole && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserRolesPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalOptTabPath = '/users/role/new/general';
        let privilegesTabPath = '/users/role/new/privileges';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Users/Roles',
                icon: 'User',
                path: '/users/roles',
            },
        ];
        this.isUserAllowedToUpdateRole = this.$hasAccess('USER_ROLE_UPDATE');

        if (this.isEdit) {
            generalOptTabPath = `/users/role/edit/${this.$route.params.id}/general`;
            privilegesTabPath = `/users/role/edit/${this.$route.params.id}/privileges`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE ROLE',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('USER_ROLE_DELETE'),
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
                        title: `${buttonPrefix} ROLE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateRole : false,
                    },
                },
            },
            {
                title: 'Privileges',
                path: privilegesTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} PRIVILEGES`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateRole : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateRole;
        delete this.buttons;
    },
};
</script>
