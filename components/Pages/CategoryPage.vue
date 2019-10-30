/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            icon="Category"
            :is-read-only="!isUserAllowedToUpdateCategory && isEdit"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    theme="secondary"
                    size="small"
                    title="REMOVE CATEGORY"
                    :disabled="!$hasAccess('CATEGORY_DELETE')"
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
    name: 'CategoryPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'category-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Categories',
                icon: 'Category',
                route: { name: 'categories-grid' },
            },
        ];
        this.isUserAllowedToUpdateCategory = this.$hasAccess('CATEGORY_UPDATE');

        if (this.isEdit) {
            const translationRoute = { name: 'category-edit-id-translations', params: this.$route.params };
            generalRoute = { name: 'category-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CATEGORY`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateCategory,
                        },
                    },
                },
                {
                    title: 'Translations',
                    route: translationRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} CATEGORY`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateCategory,
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
                            title: `${buttonPrefix} CATEGORY`,
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
        delete this.isUserAllowedToUpdateCategory;
    },
};
</script>
