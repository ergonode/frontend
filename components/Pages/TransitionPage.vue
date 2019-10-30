/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            :title="title"
            :breadcrumbs="breadcrumbs"
            :is-read-only="!isUserAllowedToUpdateTransitions && isEdit"
            icon="Flow"
            @navigateback="onDismiss">
            <template
                v-if="isEdit"
                #buttons>
                <PrependIconButton
                    theme="secondary"
                    size="small"
                    title="REMOVE TRANSITION"
                    :disabled="!$hasAccess('WORKFLOW_DELETE')"
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
    name: 'TransitionPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'workflow-transition-new-general' };
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.breadcrumbs = [
            {
                title: 'Workflow',
                icon: 'Flow',
                route: { name: 'workflow-transitions' },
            },
        ];
        this.isUserAllowedToUpdateTransitions = this.$hasAccess('WORKFLOW_UPDATE');
        if (this.isEdit) {
            const translationRoute = { name: 'transition-edit-id-translations', params: this.$route.params };
            generalRoute = { name: 'transition-edit-id-general', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';

            this.tabs = [
                {
                    title: 'General options',
                    route: generalRoute,
                    active: true,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TRANSITION`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateTransitions,
                        },
                    },
                },
                {
                    title: 'Translations',
                    route: translationRoute,
                    active: this.isEdit,
                    props: {
                        updateButton: {
                            title: `${buttonPrefix} TRANSITION`,
                            action: tabAction,
                            disabled: !this.isUserAllowedToUpdateTransitions,
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
                            title: `${buttonPrefix} TRANSITION`,
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
        delete this.isUserAllowedToUpdateTransitions;
    },
};
</script>
