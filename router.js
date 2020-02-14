/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue';
import Router from 'vue-router';
import { modulesConfig } from '~/plugins/moduleLoader';

Vue.use(Router);

const fixRoutes = (defaultRoutes) => {
    const { router, extendTabs } = modulesConfig;

    for (let i = 0; i < extendTabs.length; i += 1) {
        const index = router.findIndex(e => e.name === extendTabs[i].name);

        if (index !== -1) {
            router[index] = {
                ...router[index],
                children: [
                  ...router[index].children,
                  ...extendTabs[i].children,
                ],
            };
        }
    }

    return defaultRoutes.concat(router);
};

export function createRouter(ssrContext, createDefaultRouter, routerOptions) {
    const options = routerOptions ? routerOptions : createDefaultRouter(ssrContext).options;

    return new Router({
        ...options,
        routes: fixRoutes(options.routes)
    });
}
