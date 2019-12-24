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
import { SIZES } from '~/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import Button from '~/core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import TransitionsGridTab from '~/components/Card/Grid/TransitionsGridTab';

export default {
    name: 'WorkflowTabs',
    components: {
        TransitionsGridTab,
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
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
