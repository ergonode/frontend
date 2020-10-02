/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Button from '@Core/components/Button/Button';
import NavigationBackFab from '@Core/components/Buttons/NavigationBackFab';
import IconDelete from '@Core/components/Icons/Actions/IconDelete';
import Footer from '@Core/components/Layout/Footer/Footer';
import Page from '@Core/components/Layout/Page';
import HorizontalRoutingTabBar from '@Core/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@Core/components/TitleBar/TitleBar';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';
import {
    mapState,
} from 'vuex';

export default {
    components: {
        Page,
        TitleBar,
        HorizontalRoutingTabBar,
        Footer,
        Button,
        IconDelete,
        NavigationBackFab,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState('feedback', [
            'errors',
            'changeValues',
        ]),
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
    },
    asyncComputed: {
        async asyncTabs() {
            const tmpTabs = getNestedTabRoutes({
                hasAccess: this.$hasAccess,
                routes: this.$router.options.routes,
                route: this.$route,
            });
            const tabs = await this.$extendMethods('@Core/pages/tabs', {
                $this: this,
                tabs: tmpTabs,
            });

            return tabs.length ? [
                ...new Set([].concat(...tabs)),
            ] : tmpTabs;
        },
    },
};
