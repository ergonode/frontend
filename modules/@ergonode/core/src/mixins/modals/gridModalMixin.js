/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import HorizontalRoutingTabBarContent from '@UI/components/TabBar/Routing/HorizontalRoutingTabBarContent';

export default {
    components: {
        HorizontalRoutingTabBarContent,
    },
    data() {
        return {
            fetchGridData: false,
        };
    },
    methods: {
        onFetchedGridData() {
            this.fetchGridData = false;
        },
        onCreatedData() {
            this.fetchGridData = true;
        },
    },
};
