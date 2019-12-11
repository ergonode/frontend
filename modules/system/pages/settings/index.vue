/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Settings"
            :is-read-only="$isReadOnly('USER')" />
        <LanguageSettingsTab />
        <Footer>
            <Button
                title="SAVE SETTINGS"
                :loaded="$isLoaded('saveSettings')"
                @click.native="onSave" />
        </Footer>
    </Page>
</template>

<script>
import { mapActions } from 'vuex';
import languageSettingsModule from '~/reusableStore/languageSettings/state';

export default {
    name: 'Settings',
    components: {
        LanguageSettingsTab: () => import('~/components/Card/Tabs/LanguageSettingsTab'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
        Button: () => import('~/core/components/Buttons/Button'),
        Page: () => import('~/core/components/Layout/Page'),
    },
    beforeCreate() {
        this.$registerStore({
            module: languageSettingsModule,
            moduleName: 'languageSettings',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('languageSettings');
    },
    methods: {
        ...mapActions('languageSettings', [
            'updateData',
        ]),
        ...mapActions('data', [
            'getLanguagesDictionary',
        ]),
        async onSave() {
            await this.$setLoader('saveSettings');
            await this.updateData();
            await this.getLanguagesDictionary();
            await this.$removeLoader('saveSettings');
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: languageSettingsModule,
            moduleName: 'languageSettings',
            store,
        });
        await store.dispatch('languageSettings/getData');
    },
};
</script>
