/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Imports"
            icon="Import"
            :is-read-only="$isReadOnly('IMPORT')" />
        <HorizontalTabBar
            :items="tabs" />
    </Page>
</template>

<script>

export default {
    name: 'Import',
    middleware: ['tab/redirectToImportGrid'],
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess(['IMPORT_READ'])) {
            this.tabs.push({
                title: 'Imports',
                route: { name: 'imports-grid' },
            });
        }
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
