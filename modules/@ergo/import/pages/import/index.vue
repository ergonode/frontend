/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Imports"
            :is-read-only="$isReadOnly('IMPORT')" />
        <ImportGridTab />
    </Page>
</template>

<script>

export default {
    name: 'Import',
    components: {
        ImportGridTab: () => import('@Import/components/Tabs/ImportGridTab'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
    },
    head() {
        return {
            title: 'Imports - Ergonode',
        };
    },
};
</script>
