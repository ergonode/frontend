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
            icon="sprite-menu menu-puzzel--selected"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';
import { mapActions } from 'vuex';

export default {
    name: 'TemplatePage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Templates',
                    icon: 'sprite-menu menu-puzzel--deactive',
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
                        },
                    },
                },
                {
                    title: 'Template design',
                    path: `/templates/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/template`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE TEMPLATE',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
    created() {
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
        this.setConfigurationForList({
            draggedElementsStore: {
                storeName: 'templateDesigner',
                stateName: 'templateLayout',
                idName: ['data', 'id'],
            },
        });
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
    },
};
</script>
