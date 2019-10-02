/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BaseTab>
        <template #content>
            <LanguageSettingsCard />
        </template>
        <template #footer>
            <Footer :buttons="[...updateButton]" />
        </template>
    </BaseTab>
</template>

<script>
import languageSettingsModule from '~/reusableStore/languageSettings/state';
import LanguageSettingsCard from '~/components/Card/LanguageSettingsCard';
import BaseTab from '~/components/Card/BaseTab';

export default {
    name: 'LanguageSettingsTab',
    components: {
        Footer: () => import('~/components/ReusableFooter/Footer'),
        LanguageSettingsCard,
        BaseTab,
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
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
