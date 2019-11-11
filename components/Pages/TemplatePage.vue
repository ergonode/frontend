/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateTemplate && isEdit"
            icon="Templates"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    :theme="secondaryTheme"
                    :size="smallSize"
                    title="REMOVE TEMPLATE"
                    :disabled="!$hasAccess('TEMPLATE_DESIGNER_DELETE')"
                    @click.native="onRemove">
                    <template #prepend="{ color }">
                        <IconDelete
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
    </BasePage>
</template>

<script>
import { mapActions } from 'vuex';
import { SIZES, THEMES } from '~/defaults/buttons';
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'TemplatePage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'template-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Templates',
                icon: 'Templates',
                route: { name: 'templates' },
            },
        ];
        this.isUserAllowedToUpdateTemplate = this.$hasAccess('TEMPLATE_DESIGNER_UPDATE');
        if (this.isEdit) {
            const templateRoute = { name: 'template-edit-id-template', params: this.$route.params };
            generalRoute = { name: 'template-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TEMPLATE`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateTemplate,
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
                            disabled: !this.isUserAllowedToUpdateTemplate,
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
                            title: `${buttonPrefix} TEMPLATE`,
                            action: tabAction,
                            disabled: false,
                        },
                    },
                },
            ];
        }
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        ...mapActions('list', {
            setConfigurationForList: 'setConfigurationForList',
        }),
    },
    beforeDestroy() {
        delete this.isUserAllowedToUpdateTemplate;
        delete this.breadcrumbs;
    },
};
</script>
