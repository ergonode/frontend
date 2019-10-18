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
        let generalRoute = { name: 'workflow-status-new-general' };
        let translationRoute = {};
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.isUserAllowedToUpdateStatus = this.$hasAccess('WORKFLOW_UPDATE');
        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                route: { name: 'workflow-statuses' },
            },
        ];

        if (this.isEdit) {
            generalRoute = { name: 'workflow-status-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'workflow-status-edit-id-translations', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE STATUS',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('WORKFLOW_DELETE'),
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
                        title: `${buttonPrefix} STATUS`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateStatus : false,
                    },
                },
            },
            {
                title: 'Translations',
                route: translationRoute,
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
