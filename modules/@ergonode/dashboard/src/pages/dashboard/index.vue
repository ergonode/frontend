/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DashboardPage />
</template>

<script>

import DashboardPage from '@Dashboard/components/Pages/DashboardPage';

export default {
    name: 'Dashboard',
    components: {
        DashboardPage,
    },
    head() {
        return {
            title: 'Dashboard - Ergonode',
        };
    },
};
</script>

<style lang="scss" scoped>
    .dashboard {
        height: 100%;
        background-color: $GRAPHITE_COAL;
    }
</style>
