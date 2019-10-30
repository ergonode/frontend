/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="Attributes"
            :is-read-only="!isUserAllowedToUpdateAttribute && isEdit"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    theme="secondary"
                    size="small"
                    title="REMOVE ATTRIBUTE"
                    :disabled="!$hasAccess('ATTRIBUTE_DELETE')"
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

        this.isUserAllowedToUpdateAttribute = this.$hasAccess('ATTRIBUTE_UPDATE');
        let generalRoute = { name: 'attribute-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        if (this.isEdit) {
            const translationRoute = { name: 'attribute-edit-id-translations', params: this.$route.params };
            generalRoute = { name: 'attribute-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} ATTRIBUTE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateAttribute,
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
                            disabled: !this.isUserAllowedToUpdateAttribute,
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
                            title: `${buttonPrefix} ATTRIBUTE`,
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
        delete this.isUserAllowedToUpdateAttribute;
    },
};
</script>
