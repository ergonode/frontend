/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { SIZE, THEME } from '@Core/defaults/theme';
import { getNestedTabRoutes } from '@Core/models/navigation/tabs';
import Page from '@Core/components/Layout/Page';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import Footer from '@Core/components/Layout/Footer/Footer';
import Button from '@Core/components/Buttons/Button';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import IconAdd from '@Core/components/Icons/Actions/IconAdd';

export default {
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        Footer,
        Button,
        IconDelete,
        IconAdd,
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
