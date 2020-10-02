/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getNestedTabRoutes,
} from '@Core/models/navigation/tabs';

export default {
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
