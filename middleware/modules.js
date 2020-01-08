/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { modulesConfig } from '~/plugins/moduleLoader';

export default (ctx) => {
    const { nuxt: { middleware } } = modulesConfig;

    middleware(ctx);
};
