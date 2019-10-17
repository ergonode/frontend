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
            :is-read-only="!isUserAllowedToUpdateAttribute && isEdit"
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
                route: { name: 'attributes-grid' },
            },
        ];
        this.buttons = [];

        this.isUserAllowedToUpdateAttribute = this.$hasAccess('ATTRIBUTE_UPDATE');
        let generalRoute = { name: 'attribute-new-general' };
        let translationRoute = { name: 'attribute-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        if (this.isEdit) {
            generalRoute = { name: 'attribute-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'attribute-edit-id-translations', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.buttons = [
                {
                    title: 'REMOVE ATTRIBUTE',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('ATTRIBUTE_DELETE'),
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
                        title: `${buttonPrefix} ATTRIBUTE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateAttribute : false,
                    },
                },
            },
            {
                title: 'Translations',
                route: translationRoute,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} ATTRIBUTE`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateAttribute : false,
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
