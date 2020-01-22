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
        <HorizontalTabBar :items="tabs" />
    </Page>
</template>

<script>
import { THEMES, SIZES } from '~/defaults/buttons';
import Button from '~/core/components/Buttons/Button';
import IconAdd from '~/components/Icon/Actions/IconAdd';
import { getNestedTabRoutes } from '~/model/navigation/tabs';

export default {
    name: 'AttributeTabs',
    components: {
        TitleBar: () => import('~/core/components/TitleBar/TitleBar'),
        Page: () => import('~/core/components/Layout/Page'),
        HorizontalTabBar: () => import('~/core/components/Tab/HorizontalTabBar'),
        Button,
        IconAdd,
    },
    computed: {
        smallSize() {
            return SIZES.SMALL;
        },
        secondaryTheme() {
            return THEMES.SECONDARY;
        },
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
    },
    methods: {
        addAttribute() {
            this.$router.push({ name: 'attribute-new-general' });
        },
    },
};
</script>
