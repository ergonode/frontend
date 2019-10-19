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
            :is-read-only="!isUserAllowedToUpdateTemplate && isEdit"
            icon="Templates"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import { mapActions } from 'vuex';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'TemplatePage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'template-new-general' };
        let templateRoute = {};
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Templates',
                icon: 'Templates',
                route: { name: 'templates' },
            },
        ];
        this.isUserAllowedToUpdateTemplate = this.$hasAccess('TEMPLATE_DESIGNER_UPDATE');
        if (this.isEdit) {
            generalRoute = { name: 'template-edit-id-general', params: this.$route.params };
            templateRoute = { name: 'template-edit-id-template', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE TEMPLATE',
                    action: this.onRemove,
                    theme: 'secondary',
                    disabled: !this.$hasAccess('TEMPLATE_DESIGNER_DELETE'),
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
                        title: `${buttonPrefix} TEMPLATE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateTemplate : false,
                    },
                },
            },
            {
                title: 'Template designer',
                route: templateRoute,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} TEMPLATE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateTemplate : false,
                    },
                },
            },
        ];
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
    },
    beforeDestroy() {
        delete this.isUserAllowedToUpdateTemplate;
        delete this.breadcrumbs;
        delete this.buttons;
    },
};
</script>
