/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SettingsPage
        title="Settings"
        icon="Settings" />
</template>

<script>

export default {
    name: 'Settings',
    middleware: ['tab/redirectToLanguageSettings'],
    components: {
        SettingsPage: () => import('~/components/Pages/SettingsPage'),
    },
};
</script>
