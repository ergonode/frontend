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
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'ProductStatusPage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Product statuses',
                    icon: 'Flow',
                    path: '/workflow/statuses',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/workflow/statuses/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE STATUS' : 'CREATE STATUS',
                            action: this.isEdit ? this.onSave : this.onCreate,
                            disabled: this.isEdit ? !this.$canIUse('WORKFLOW_UPDATE') : false,
                        },
                    },
                },
                {
                    title: 'Translations',
                    path: `/workflow/statuses/${this.isEdit ? `edit/${this.$route.params.id}` : 'add'}/translations`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE STATUS',
                            action: this.onSave,
                            disabled: !this.$canIUse('WORKFLOW_UPDATE'),
                        },
                    },
                },
            ],
        };
    },
    created() {
        if (this.isEdit) {
            this.buttons = [
                {
                    title: 'REMOVE STATUS',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$canIUse('WORKFLOW_DELETE'),
                },
            ];
        }
    },
};
</script>
