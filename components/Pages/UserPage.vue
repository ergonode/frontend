/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="User"
            :is-read-only="!isUserAllowedToUpdateUser && isEdit"
            @navigateback="onDismiss">
            <!-- <template
                v-if="isEdit"
                #mainAction>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE USER"
                    :disabled="!$hasAccess('USER_DELETE')"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template> -->
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
    </Page>
</template>

<script>
import { SIZES, THEMES } from '~/defaults/buttons';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'UserPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'user-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Users',
                icon: 'User',
                route: { name: 'users-grid' },
            },
        ];
        this.isUserAllowedToUpdateUser = this.$hasAccess(['USER_UPDATE']);

        if (this.isEdit) {
            const avatarRoute = { name: 'user-edit-id-avatar', params: this.$route.params };
            generalRoute = { name: 'user-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
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
                            disabled: !this.isUserAllowedToUpdateUser,
                        },
                    },
                },
            ];
        } else {
            this.tabs = [
                {
                    title: 'General Options',
                    route: generalRoute,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} USER`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateUser;
    },
};
</script>
