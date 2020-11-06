/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import NavigationBackFab from '@Core/components/Buttons/NavigationBackFab';
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import Button from '@UI/components/Button/Button';
import IconDelete from '@UI/components/Icons/Actions/IconDelete';
import Footer from '@UI/components/Layout/Footer/Footer';
import Page from '@UI/components/Layout/Page';
import HorizontalRoutingTabBar from '@UI/components/TabBar/Routing/HorizontalRoutingTabBar';
import TitleBar from '@UI/components/TitleBar/TitleBar';
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
        /**
         * The title of the component
         */
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
};
