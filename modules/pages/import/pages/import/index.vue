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
import { SIZES } from '~/defaults/buttons';

export default {
    name: 'Import',
    middleware: ['tab/redirectToImportGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        BasePage: () => import('~/components/Layout/BasePage'),
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('IMPORT_READ')) {
            this.tabs.push({
                title: 'Imports',
                route: { name: 'imports-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
