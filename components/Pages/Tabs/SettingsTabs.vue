/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <NavigationHeader
            :title="title"
            :buttons="buttons"
            :icon="icon" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import categoryManagementPageBaseMixin from '~/mixins/page/categoryManagementPageBaseMixin';

export default {
    name: 'SettingsTabs',
    mixins: [categoryManagementPageBaseMixin],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        NavigationHeader: () => import('~/components/ReusableHeader/NavigationHeader'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttons: {
            type: Array,
            default: () => [],
        },
        icon: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Language',
                    path: '/settings/language',
                    active: true,
                    isContextualMenu: false,
                    props: {
                        updateButton: {
                            title: 'SAVE SETTINGS',
                            action: this.onSave,
                        },
                    },
                },
            ],
        };
    },
};
</script>
