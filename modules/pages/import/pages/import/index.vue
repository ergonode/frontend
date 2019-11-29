/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Imports"
            icon="Import"
            :is-read-only="$isReadOnly('IMPORT')" />
        <HorizontalTabBar
            :items="tabs" />
    </BasePage>
</template>

<script>

export default {
    name: 'Import',
    middleware: ['tab/redirectToImportGrid'],
    components: {
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        BasePage: () => import('~/core/components/Layout/BasePage'),
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
