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
        ImportGridTab: () => import('@Modules/@ergo/import/components/Tabs/ImportGridTab'),
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
    },
};
</script>
