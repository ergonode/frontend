/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <PageWrapper>
        <TitleBar
            title="Attributes"
            icon="Attributes"
            :is-read-only="$isReadOnly('ATTRIBUTE')">
            <template #buttons>
                <PrependIconButton
                    title="CREATE ATTRIBUTE"
                    :size="smallSize"
                    :disabled="!$hasAccess('ATTRIBUTE_CREATE')"
                    @click.native="addNewAttribute">
                    <template #prepend="{ color }">
                        <IconAdd
                            :fill-color="color" />
                    </template>
                </PrependIconButton>
            </template>
        </TitleBar>
        <HorizontalTabBar
            :items="tabs" />
    </PageWrapper>
</template>

<script>
import { SIZES } from '~/defaults/buttons';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'AttributeTabs',
    middleware: ['tab/redirectToAttributeGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        PageWrapper: () => import('~/components/Layout/PageWrapper'),
        PrependIconButton,
        IconAdd,
    },
    beforeCreate() {
        this.tabs = [];
        if (this.$hasAccess('ATTRIBUTE_READ')) {
            this.tabs.push({
                title: 'Attributes',
                route: { name: 'attributes-grid' },
                active: true,
                isContextualMenu: false,
            });
        }
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
    },
    methods: {
        addNewAttribute() {
            this.$router.push('/attributes/attribute/new/general');
        },
    },
    beforeDestroy() {
        delete this.tabs;
    },
};
</script>
