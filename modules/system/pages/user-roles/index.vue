/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Page>
        <TitleBar
            title="User roles"
            :is-read-only="$isReadOnly('USER')">
            <template #mainAction>
                <Button
                    title="NEW ROLE"
                    :size="smallSize"
                    :disabled="!$hasAccess(['USER_CREATE'])"
                    @click.native="addUserRole">
                    <template #prepend="{ color }">
                        <IconAdd :fill-color="color" />
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
    name: 'UsersTabs',
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
        addUserRole() {
            this.$router.push({ name: 'user-role-new-general' });
        },
    },
};
</script>
