/* eslint-disable import/no-extraneous-dependencies */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue';
import Router from 'vue-router';
import routerModules from '~/.nuxt/router.modules';
import extendsModules from '~/.nuxt/extends.modules';
import routerLocal from './router.local';

Vue.use(Router);

const scrollBehavior = (to, from, savedPosition) => {
    let position = false;
    if (to.matched.length < 2) {
        position = { x: 0, y: 0 };
    } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
        position = { x: 0, y: 0 };
    }
    if (savedPosition) {
        position = savedPosition;
    }
    return new Promise((resolve) => {
        window.$nuxt.$once('triggerScroll', () => {
            if (to.hash && document.querySelector(to.hash)) {
                position = { selector: to.hash };
            }
            resolve(position);
        });
    });
};

const extendRoutes = () => {
    const extendTabs = Object.values(extendsModules)
        .reduce((acc, current) => {
            let connectedArray = acc;

            if (current.extendTabs) {
                connectedArray = [...acc, ...current.extendTabs];
            }
            return connectedArray;
        }, []);
    const extendedRoutes = [].concat(...Object.values(routerModules), routerLocal);

    for (let i = 0; i < extendTabs.length; i += 1) {
        const index = extendedRoutes.findIndex(e => e.name === extendTabs[i].name);

        if (index !== -1) {
            extendedRoutes[index] = {
                ...extendedRoutes[index],
                children: [
                    ...extendedRoutes[index].children,
                    ...extendTabs[i].children,
                ],
            };
        }
    }
    return extendedRoutes;
};

export function createRouter() {
    return new Router({
        mode: 'history',
        base: '/',
        linkActiveClass: 'nuxt-link-active',
        linkExactActiveClass: 'nuxt-link-exact-active',
        scrollBehavior,
        routes: extendRoutes(),
        fallback: false,
    });
}
