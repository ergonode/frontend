/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';

export default {
    components: {
        Page: () => import('@Core/components/Layout/Page'),
        TitleBar: () => import('@Core/components/TitleBar/TitleBar'),
        HorizontalRoutingTabBar: () => import('@Core/components/TabBar/Routing/HorizontalRoutingTabBar'),
        Footer: () => import('@Core/components/Layout/Footer/Footer'),
        Button: () => import('@Core/components/Buttons/Button'),
        IconDelete: () => import('@Core/components/Icons/Actions/IconDelete'),
        IconAdd: () => import('@Core/components/Icons/Actions/IconAdd'),
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        tabs() {
            return getNestedTabRoutes(this.$hasAccess, this.$router.options.routes, this.$route);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
    },
    methods: {
        onRemove() {
            this.$emit('remove');
        },
        onSave() {
            this.$emit('save');
        },
    },
};
