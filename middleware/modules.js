/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getModulesConfig } from '~/plugins/moduleLoader';

export default (ctx) => {
    const { nuxt: { middleware } } = getModulesConfig;

    middleware(ctx);
};
