/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import NavigateBackFab from '@Core/components/Buttons/NavigateBackFab';
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
        NavigateBackFab,
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
    },
};
