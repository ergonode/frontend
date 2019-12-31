/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Status transition"
            :is-read-only="$isReadOnly('WORKFLOW')">
            <template #mainAction>
                <Button
                    title="NEW TRANSITION"
                    :size="smallSize"
                    :disabled="!$hasAccess(['WORKFLOW_CREATE'])"
                    @click.native="addStatusTransition">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <TransitionsGridTab />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import gridModule from '@Core/reusableStore/grid/state';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import TransitionsGridTab from '@Transitions/components/Tabs/TransitionsGridTab';

export default {
    name: 'WorkflowTabs',
    components: {
        TransitionsGridTab,
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'transitionsGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('transitionsGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addStatusTransition() {
            this.$router.push({ name: 'transition-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'transitionsGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/workflow/default/transitions`;
        await store.dispatch('transitionsGrid/getData', gridPath);
    },
};
</script>
