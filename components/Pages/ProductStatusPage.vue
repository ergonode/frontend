/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="Flow"
            :is-read-only="!isUserAllowedToUpdateStatus && isEdit"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    theme="secondary"
                    size="small"
                    title="REMOVE STATUS"
                    :disabled="!$hasAccess('WORKFLOW_DELETE')"
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
    name: 'ProductStatusPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'workflow-status-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.isUserAllowedToUpdateStatus = this.$hasAccess('WORKFLOW_UPDATE');
        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                route: { name: 'workflow-statuses' },
            },
        ];

        if (this.isEdit) {
            const translationRoute = { name: 'workflow-status-edit-id-translations', params: this.$route.params };
            generalRoute = { name: 'workflow-status-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} STATUS`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateStatus,
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
                            disabled: !this.isUserAllowedToUpdateStatus,
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
                            title: `${buttonPrefix} STATUS`,
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
        delete this.isUserAllowedToUpdateStatus;
    },
};
</script>
