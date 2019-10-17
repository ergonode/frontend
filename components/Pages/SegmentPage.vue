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
            :is-read-only="!isUserAllowedToUpdateSegments && isEdit"
            icon="Templates"
            @navigateback="onDismiss" />
        <HorizontalTabBar :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'SegmentPage',
    mixins: [categoryManagementPageBaseMixin],
    created() {
        let generalRoute = { name: 'segment-new-general' };
        let translationRoute = {};
        let tabAction = this.onCreate;
        let buttonPrefix = 'CREATE';

        this.buttons = [];
        this.breadcrumbs = [
            {
                title: 'Segments',
                icon: 'Templates',
                route: { name: 'segments-grid' },
            },
        ];
        this.isUserAllowedToUpdateSegments = this.$hasAccess('SEGMENT_UPDATE');
        if (this.isEdit) {
            generalRoute = { name: 'segment-edit-id-general', params: this.$route.params };
            translationRoute = { name: 'segment-edit-id-translations', params: this.$route.params };
            tabAction = this.onSave;
            buttonPrefix = 'SAVE';


            this.buttons = [
                {
                    title: 'REMOVE SEGMENT',
                    color: 'transparent',
                    action: this.onRemove,
                    theme: 'dark',
                    icon: 'remove',
                    disabled: !this.$hasAccess('SEGMENT_DELETE'),
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
                        title: `${buttonPrefix} SEGMENT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateSegments : false,
                    },
                },
            },
            {
                title: 'Translations',
                route: translationRoute,
                active: this.isEdit,
                props: {
                    updateButton: {
                        title: `${buttonPrefix} SEGMENT`,
                        action: tabAction,
                        disabled: this.isEdit ? !this.isUserAllowedToUpdateSegments : false,
                    },
                },
            },
        ];
    },
    beforeDestroy() {
        delete this.breadcrumbs;
        delete this.isUserAllowedToUpdateSegments;
        delete this.buttons;
    },
};
</script>
