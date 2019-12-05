/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Settings"
            :is-read-only="$isReadOnly('USER')" />
        <HorizontalTabBar :items="tabs" />
    </Page>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'SettingsTabs',
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
    },
    data() {
        return {
            tabs: [
                {
                    title: 'Language',
                    route: { name: 'settings-language' },
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
