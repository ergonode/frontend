/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridViewTemplate>
        <template #sidebar>
            <VerticalTabBar :items="verticalTabs" />
        </template>
        <template #grid>
            <ConditionSetWrapper />
        </template>
    </GridViewTemplate>
</template>

<script>
import GridViewTemplate from '~/core/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'ConditionSetDesignTab',
    components: {
        GridViewTemplate,
        VerticalTabBar: () => import('~/core/components/Tab/VerticalTabBar'),
        ConditionSetWrapper: () => import('~/components/ConditionSetDesigner/ConditionSetWrapper'),
    },
    data: () => ({
        verticalTabs: [
            {
                title: 'Conditions',
                component: () => import('~/components/Card/Lists/ConditionsListTab'),
                iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
            },
        ],
    }),
    async fetch({
        store,
    }) {
        await Promise.all([
            store.dispatch('gridDesigner/clearStorage'),
            store.dispatch('list/clearStorage'),
            store.dispatch('conditions/clearStorage'),
            store.dispatch('conditions/getConditions', { group: 'segment' }),
        ]);
        const { conditionsDictionary } = store.state.conditions;

        await store.dispatch('list/setElementsForLanguage', conditionsDictionary);
    },
};
</script>
