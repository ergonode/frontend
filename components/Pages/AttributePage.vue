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

export default {
    name: 'AttributePage',
    mixins: [categoryManagementPageBaseMixin],
    data() {
        return {
            breadcrumbs: [
                {
                    title: 'Attributes',
                    icon: 'sprite-menu menu-puzzel--deactive',
                },
            ],
            buttons: [],
            tabs: [
                {
                    title: 'General options',
                    path: `/attributes/${this.isEdit ? `edit/${this.$route.params.id}` : 'new'}/general`,
                    active: true,
                    props: {
                        updateButton: {
                            title: this.isEdit ? 'SAVE ATTRIBUTE' : 'CREATE ATTRIBUTE',
                            action: this.isEdit ? this.onSave : this.onCreate,
                        },
                    },
                },
                {
                    title: 'Translations',
                    path: `/attributes/${this.isEdit ? `edit/${this.$route.params.id}` : 'add'}/translations`,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: 'SAVE ATTRIBUTE',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
    created() {
        if (this.isEdit) {
            this.buttons = [
                // uncomment when we create removal options
                // {
                //     title: 'REMOVE ATTRIBUTE',
                //     color: 'transparent',
                //     action: this.onRemove,
                //     theme: 'dark',
                //     icon: 'sprite-system system-trash--deactive',
                // },
            ];
        }
    },
};
</script>
