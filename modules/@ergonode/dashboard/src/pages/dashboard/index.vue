/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <DashboardPage />
</template>

<script>

import DashboardPage from '../../components/Pages/DashboardPage';
import EmptyDashboardPage from '../../components/Pages/EmptyDashboardPage';

export default {
    name: 'Dashboard',
    components: {
        DashboardPage,
        EmptyDashboardPage,
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
        background-color: $GRAPHITE_COAL;
        height: 100%;
    }
</style>
