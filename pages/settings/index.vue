/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Settings"
            icon="Settings" />
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SettingsTabs',
    middleware: ['tab/redirectToLanguageSettings'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Language',
                    route: { name: 'settings-language' },
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
    methods: {
        ...mapActions('languageSettings', [
            'updateData',
        ]),
        ...mapActions('data', [
            'getLanguagesDictionary',
        ]),
        async onSave() {
            await this.updateData();
            await this.getLanguagesDictionary();
        },
    },
};
</script>
