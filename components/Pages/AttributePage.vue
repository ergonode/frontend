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
            icon="Attributes"
            :is-read-only="!isUserAllowedToUpdateAttribute"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'AttributePage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        this.breadcrumbs = [
            {
                title: 'Attributes',
                icon: 'Attributes',
                path: '/attributes',
            },
        ];
        this.buttons = [];

        this.isUserAllowedToUpdateAttribute = this.$canIUse('ATTRIBUTE_UPDATE');
        let generalOptTabPath = '/attributes/new/general';
        let translationsTabPath = '/attributes/new/translation';
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        if (this.isEdit) {
            generalOptTabPath = `/attributes/edit/${this.$route.params.id}/general`;
            translationsTabPath = `/attributes/edit/${this.$route.params.id}/translations`;
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

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

        this.tabs = [
            {
                title: 'General options',
                path: generalOptTabPath,
                active: true,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} ATTRIBUTE`,
                        action: tabAction,
                        disabled: this.isEdit ? this.isUserAllowedToUpdateAttribute : false,
                    },
                },
            },
            {
                title: 'Translations',
                path: translationsTabPath,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} ATTRIBUTE`,
                        action: tabAction,
                        disabled: !this.isUserAllowedToUpdateAttribute,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateAttribute;
        delete this.buttons;
    },
};
</script>
