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

import { mapActions } from 'vuex';
import GridViewTemplate from '@Core/components/Layout/Templates/GridViewTemplate';

export default {
    name: 'ConditionSetDesignTab',
    components: {
        GridViewTemplate,
        VerticalTabBar: () => import('@Core/components/Tab/VerticalTabBar'),
        ConditionSetWrapper: () => import('~/components/ConditionSetDesigner/ConditionSetWrapper'),
    },
    destroyed() {
        this.clearGridDesignerStorage();
        this.clearConditionsStorage();
    },
    computed: {
        verticalTabs() {
            return [
                {
                    title: 'Conditions',
                    component: () => import('~/components/Card/Lists/ConditionsListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
                },
            ];
        },
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: 'clearStorage',
        }),
        ...mapActions('conditions', {
            clearConditionsStorage: 'clearStorage',
        }),
    },
    async fetch({
        store,
    }) {
        await Promise.all([
            store.dispatch('conditions/getConditions', { group: 'workflow' }),
        ]);
        const { conditionsDictionary } = store.state.conditions;

        await store.dispatch('list/setElementsForLanguage', conditionsDictionary);
    },
};
</script>
