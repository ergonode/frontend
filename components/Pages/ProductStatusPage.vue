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
            icon="Flow"
            :is-read-only="!isUserAllowedToUpdateStatus && isEdit"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductStatusPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalOptTabPath = '/workflow/status/new/general';
        let translationsTabPath = '';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.isUserAllowedToUpdateStatus = this.$hasAccess('WORKFLOW_UPDATE');
        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                path: '/workflow/statuses',
            },
        ];

        if (this.isEdit) {
            generalOptTabPath = `/workflow/status/edit/${this.$route.params.id}/general`;
            translationsTabPath = `/workflow/status/edit/${this.$route.params.id}/translations`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE STATUS',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('WORKFLOW_DELETE'),
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
                        title: `${buttonPrefix} STATUS`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateStatus : false,
                    },
                },
            },
            {
                title: 'Translations',
                path: translationsTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} STATUS`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateStatus : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateStatus;
        delete this.buttons;
    },
};
</script>
