/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue';
import Router from 'vue-router';
import ModuleLoader from '~/plugins/moduleLoader';
import { pages } from '~/router.config';

Vue.use(Router);

const modulesRouter = ModuleLoader.getRouterConfigs();
const expandedRouter = pages.concat(modulesRouter);

const routes = expandedRouter.reduce((previousPage, currentPage) => {
    const {
        name,
        path,
        component,
        filePath,
        module = null,
        source = null,
    } = currentPage;
    const newRouting = {
        name,
        path,
        component,
    };
    previousPage.push(newRouting);
    return previousPage;
}, []);

const scrollBehavior = (to, from, savedPosition) => {
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    let position = false;
    // if no children detected
    if (to.matched.length < 2) {
    // scroll to the top of the page
        position = { x: 0, y: 0 };
    } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 };
    }
    // savedPosition is only available for popstate navigations (back button)
    if (savedPosition) {
        position = savedPosition;
    }
    return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
            // coords will be used if no selector is provided,
            // or if the selector didn't match any element.
            if (to.hash && document.querySelector(to.hash)) {
                // scroll to anchor by returning the selector
                position = { selector: to.hash };
            }
            resolve(position);
        });
    });
};

export function createRouter() {
    return new Router({
        mode: 'history',
        base: '/',
        linkActiveClass: 'nuxt-link-active',
        linkExactActiveClass: 'nuxt-link-exact-active',
        scrollBehavior,
        routes: pages,
        fallback: false,
    });
}
