/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <BasePage>
        <TitleBar
            title="Attributes"
            icon="Attributes"
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
            <template
                v-if="isAttributeGroupsTab"
                #subActions>
                <TitleBarSubActions>
                    <PrependIconButton
                        title="NEW GROUP"
                        :size="smallSize"
                        :theme="secondaryTheme"
                        :disabled="!$hasAccess(['ATTRIBUTE_CREATE'])"
                        @click.native="addAttributeGroup">
                        <template #prepend="{ color }">
                            <IconAdd :fill-color="color" />
                        </template>
                    </PrependIconButton>
                </TitleBarSubActions>
            </template>
        </TitleBar>
        <HorizontalTabBar :items="tabs" />
    </BasePage>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import { getNestedTabRoutes } from '~/model/navigation/tabs';
import PrependIconButton from '~/components/Buttons/PrependIconButton';
import IconAdd from '~/components/Icon/Actions/IconAdd';

export default {
    name: 'AttributeTabs',
    middleware: ['tab/redirectToAttributeGrid'],
    components: {
        HorizontalTabBar: () => import('~/components/Tab/HorizontalTabBar'),
        TitleBar: () => import('~/components/TitleBar/TitleBar'),
        TitleBarSubActions: () => import('~/components/TitleBar/TitleBarSubActions'),
        BasePage: () => import('~/components/Layout/BasePage'),
        PrependIconButton,
        IconAdd,
    },
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        isAttributeGroupsTab() {
            return /group/.test(this.$route.path);
        },
    },
    methods: {
        addAttribute() {
            this.$router.push('/attributes/attribute/new/general');
        },
        addAttributeGroup() {
            this.$router.push('/attributes/group/new/general');
        },
    },
};
</script>
