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
            :is-read-only="!isUserAllowedToUpdateTransitions && isEdit"
            icon="Flow"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'TransitionPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalOptTabPath = '/workflow/transition/new/general';
        let translationTabPath = '';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                path: '/workflow/transitions',
            },
        ];
        this.isUserAllowedToUpdateTransitions = this.$hasAccess('WORKFLOW_UPDATE');
        if (this.isEdit) {
            generalOptTabPath = `/workflow/transition/edit/${this.$route.params.id}/general`;
            translationTabPath = `/workflow/transition/edit/${this.$route.params.id}/translations`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';


            this.buttons = [
                {
                    title: 'REMOVE TRANSITION',
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
                        title: `${buttonPrefix} TRANSITION`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateTransitions : false,
                    },
                },
            },
            {
                title: 'Translations',
                path: translationTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} TRANSITION`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateTransitions : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateTransitions;
        delete this.buttons;
    },
};
</script>
