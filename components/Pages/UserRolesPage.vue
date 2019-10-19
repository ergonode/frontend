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
        let generalRoute = { name: 'users-role-new-general' };
        let privilegesRoute = {};
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Users/Roles',
                icon: 'User',
                route: { name: 'users-roles' },
            },
        ];
        this.isUserAllowedToUpdateRole = this.$hasAccess('USER_ROLE_UPDATE');

        if (this.isEdit) {
            generalRoute = { name: 'users-role-edit-id-general', params: this.$route.params };
            privilegesRoute = { name: 'users-role-edit-id-privileges', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE ROLE',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('USER_ROLE_DELETE'),
                    prepend: {
                        component: () => import('~/components/Icon/Actions/IconDelete'),
                    },
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
                        title: `${buttonPrefix} ROLE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateRole : false,
                    },
                },
            },
            {
                title: 'Privileges',
                route: privilegesRoute,
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
