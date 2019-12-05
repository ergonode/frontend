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
    </Page>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import languageSettingsModule from '~/reusableStore/languageSettings/state';
import LanguageSettingsTab from '~/components/Card/Tabs/LanguageSettingsTab';

export default {
    name: 'UsersTabs',
    components: {
        LanguageSettingsTab,
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
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
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
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
