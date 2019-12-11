/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="Attribute groups"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #mainAction>
                <PrependIconButton
                    title="NEW ATTRIBUTE GROUP"
                    :size="smallSize"
                    :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                    @click.native="addAttributeGroup">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <AttributeGroupGridTab />
    </Page>
</template>

<script>
import gridModule from '~/reusableStore/grid/state';
import { THEMES, SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/core/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import AttributeGroupGridTab from '~/components/Card/Grid/AttributeGroupGridTab';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        AttributeGroupGridTab,
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.$registerStore({
            module: gridModule,
            moduleName: 'attributeGroupGrid',
            store: this.$store,
        });
    },
    beforeDestroy() {
        this.$store.unregisterModule('attributeGroupGrid');
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
        addAttributeGroup() {
            this.$router.push({ name: 'attribute-group-new-general' });
        },
    },
    async fetch({ app, store }) {
        app.$registerStore({
            module: gridModule,
            moduleName: 'attributeGroupGrid',
            store,
        });
        const gridPath = `${store.state.authentication.user.language}/attributes/groups`;
        await store.dispatch('attributeGroupGrid/getData', gridPath);
    },
};
</script>
