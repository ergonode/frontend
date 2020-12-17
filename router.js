/* eslint-disable import/no-extraneous-dependencies */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Vue from 'vue';
import Router from 'vue-router';

import {
    extendRoutes,
    scrollBehavior,
} from '~/.nuxt/routerHelper.modules';

import localRouter from './router.local';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        base: '/',
        linkActiveClass: 'nuxt-link-active',
        linkExactActiveClass: 'nuxt-link-exact-active',
        scrollBehavior,
        routes: extendRoutes(localRouter),
        fallback: false,
    });
}
