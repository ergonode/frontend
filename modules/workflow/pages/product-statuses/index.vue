/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Product statuses"
            :is-read-only="$isReadOnly('WORKFLOW')">
            <template #mainAction>
                <Button
                    title="NEW STATUS"
                    :size="smallSize"
                    :disabled="!$hasAccess(['WORKFLOW_CREATE'])"
                    @click.native="addStatus">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <ProductStatusGridTab />
    </Page>
</template>

<script>
import { SIZES } from '@Core/defaults/buttons';
import gridModule from '~/reusableStore/grid/state';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import ProductStatusGridTab from '~/components/Card/Grid/ProductStatusGridTab';

export default {
    name: 'WorkflowTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        ProductStatusGridTab,
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'statusesGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('statusesGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addStatus() {
            this.$router.push({ name: 'product-status-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'statusesGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/status`;
        await store.dispatch('statusesGrid/getData', gridPath);
    },
};
</script>
