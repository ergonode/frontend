/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attributes"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #mainAction>
                <Button
                    title="NEW ATTRIBUTE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="addAttribute">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </Button>
            </template>
        </TitleBar>
        <AttributeGridTab />
    </Page>
</template>

<script>
import gridModule from '@Core/reusableStore/grid/state';
import { THEMES, SIZES } from '@Core/defaults/buttons';
import Button from '@Core/components/Buttons/Button';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';
import AttributeGridTab from '@Attributes/components/Tabs/AttributeGridTab';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        Page: () => import('@Core/components/Layout/Page'),
        AttributeGridTab,
        Button,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'attributeGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('attributeGrid');
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
    },
    methods: {
        addAttribute() {
            this.$router.push({ name: 'attribute-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'attributeGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/attributes`;
        await store.dispatch('attributeGrid/getData', gridPath);
    },
};
</script>
