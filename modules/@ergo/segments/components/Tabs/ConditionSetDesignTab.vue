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
        ConditionSetWrapper: () => import('@Conditions/components/ConditionSetDesigner/ConditionSetWrapper'),
    },
    fetch({ store }) {
        return Promise.all([
            store.dispatch('conditions/getConditions', { group: 'segment' }),
        ]);
    },
    computed: {
        verticalTabs() {
            return [
                {
                    title: 'Conditions',
                    component: () => import('@Conditions/components/Tabs/Lists/ConditionsListTab'),
                    iconComponent: () => import('@Core/components/Icons/Menu/IconCategory'),
                },
            ];
        },
    },
    destroyed() {
        this.clearGridDesignerStorage();
        this.clearConditionsStorage();
    },
    methods: {
        ...mapActions('gridDesigner', {
            clearGridDesignerStorage: 'clearStorage',
        }),
        ...mapActions('conditions', {
            clearConditionsStorage: 'clearStorage',
        }),
    },
};
</script>
