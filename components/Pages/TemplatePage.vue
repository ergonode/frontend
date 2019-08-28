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
            icon="Templates"
            :is-read-only="!isUserAllowedToUpdateTemplate && isEdit"
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
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Templates',
                    icon: 'Templates',
                    path: '/templates',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/templates/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE TEMPLATE' : 'CREATE TEMPLATE',
                            action: this.isEdit ? this.onSave : this.onCreate,
                            disabled: this.isEdit ? !this.isUserAllowedToUpdateTemplate : false,
                        },
                    },
                },
                {
                    title: 'Template designer',
                    path: `/templates/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/template`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE TEMPLATE',
                            action: this.onSave,
                            disabled: this.isEdit ? !this.isUserAllowedToUpdateTemplate : false,
                        },
                    },
                },
            ],
        };
    },
    created() {
        this.isUserAllowedToUpdateTemplate = this.$hasAccess('TEMPLATE_DESIGNER_UPDATE');
        if (this.isEdit) {
            // uncomment when we create removal options
            // this.buttons = [
            //     {
            //         title: 'REMOVE TEMPLATE',
            //         color: 'transparent',
            //         action: this.onRemove,
            //         theme: 'dark',
            //         icon: 'sprite-system system-trash--deactive',
            //     },
            // ];
        }
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
    },
    beforeDestroy() {
        delete this.isUserAllowedToUpdateTemplate;
    },
};
</script>
