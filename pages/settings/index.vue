/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SettingsPage
        title="Settings"
        icon="Settings"
        @save="onSave" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Settings',
    middleware: ['tab/redirectToLanguageSettings'],
    components: {
        SettingsPage: () => import('~/components/Pages/SettingsPage'),
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
