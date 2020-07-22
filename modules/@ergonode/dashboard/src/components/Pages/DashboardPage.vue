/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="dashboard-page">
        <VerticalFixedScroll>
            <div class="dashboard-page__layout">
                <UserWelcome />
            </div>
        </VerticalFixedScroll>
    </div>
</template>

<script>
import VerticalFixedScroll from '@Core/components/Layout/Scroll/VerticalFixedScroll';
import UserWelcome from '@Dashboard/components/UserWelcome/UserWelcome';

export default {
    name: 'DashboardPage',
    components: {
        VerticalFixedScroll,
        UserWelcome,
    },
    computed: {},
    methods: {},
};
</script>

<style lang="scss" scoped>
    .dashboard-page {
        display: flex;
        flex-direction: column;
        background-color: $GRAPHITE_COAL;
        height: 100%;
        box-sizing: border-box;

        &__layout {
            display: grid;
            grid-gap: 40px;
            padding: 32px 40px 40px;
        }
    }
</style>
