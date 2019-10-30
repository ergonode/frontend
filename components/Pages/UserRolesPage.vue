/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="User"
            :is-read-only="!isUserAllowedToUpdateRole && isEdit"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    theme="secondary"
                    size="small"
                    title="REMOVE ROLE"
                    :disabled="!$hasAccess('USER_ROLE_DELETE')"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
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
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Users/Roles',
                icon: 'User',
                route: { name: 'users-roles' },
            },
        ];
        this.isUserAllowedToUpdateRole = this.$hasAccess('USER_ROLE_UPDATE');

        if (this.isEdit) {
            const privilegesRoute = { name: 'users-role-edit-id-privileges', params: this.$route.params };
            generalRoute = { name: 'users-role-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} ROLE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateRole,
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
                            disabled: !this.isUserAllowedToUpdateRole,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} ROLE`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateRole;
    },
};
</script>
