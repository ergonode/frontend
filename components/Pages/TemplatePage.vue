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
        let generalOptTabPath = '/templates/template/new/general';
        let templatePath = '';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Templates',
                icon: 'Templates',
                path: '/templates',
            },
        ];
        this.isUserAllowedToUpdateTemplate = this.$hasAccess('TEMPLATE_DESIGNER_UPDATE');
        if (this.isEdit) {
            generalOptTabPath = `/templates/template/edit/${this.$route.params.id}/general`;
            templatePath = `/templates/template/edit/${this.$route.params.id}/template`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE TEMPLATE',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('TEMPLATE_DESIGNER_DELETE'),
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
                        title: `${buttonPrefix} TEMPLATE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateTemplate : false,
                    },
                },
            },
            {
                title: 'Template designer',
                path: templatePath,
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
