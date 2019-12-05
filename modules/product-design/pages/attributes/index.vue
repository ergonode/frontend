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
                <PrependIconButton
                    title="NEW ATTRIBUTE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="addAttribute">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <AttributeGridTab />
    </Page>
</template>

<script>
import gridModule from '~/reusableStore/grid/state';
import { THEMES, SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import AttributeGridTab from '~/components/Card/Grid/AttributeGridTab';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        AttributeGridTab,
        PrependIconButton,
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
            this.$router.push('/attributes/attribute/new/general');
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
