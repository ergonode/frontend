/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <div class="tab">
        <div class="horizontal-wrapper">
            <div class="tab__options">
                <VerticalTabBar :items="verticalTabs" />
            </div>
            <div class="tab__grid">
                <ConditionSetWrapper />
            </div>
        </div>
        <Footer :buttons="[...updateButton]" />
    </div>
</template>

<script>
export default {
    name: 'ConditionSetDesignTab',
    components: {
        VerticalTabBar: () => import('~/components/Tab/VerticalTabBar'),
        ConditionSetWrapper: () => import('~/components/ConditionSetDesigner/ConditionSetWrapper'),
        Footer: () => import('~/components/ReusableFooter/Footer'),
    },
    props: {
        updateButton: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Conditions',
                component: () => import('~/components/Card/Tabs/ConditionsListTab'),
                iconPath: 'Menu/IconCategory',
                active: true,
            },
        ],
    }),
};
</script>

<style lang="scss" scoped>
    .tab {
        display: flex;
        flex: 1;
        flex-direction: column;
        background-color: $WHITE;

        .horizontal-wrapper {
            display: flex;
            flex: 1;
        }

        &__options {
            display: flex;
            margin: 24px 12px 0 24px;
        }

        &__grid {
            display: flex;
            flex: 1;
            flex-direction: column;
            width: 0;
            margin: 24px 24px 0 0;
            overflow: hidden;
        }
    }
</style>
