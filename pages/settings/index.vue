/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Settings"
            icon="Settings" />
        <HorizontalTabBar
            :items="tabs" />
    </BasePage>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SettingsTabs',
    middleware: ['tab/redirectToLanguageSettings'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
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
