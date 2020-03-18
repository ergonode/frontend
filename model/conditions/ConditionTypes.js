/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { TYPES } from '~/defaults/conditions';

export function hasOptions(type) {
    return type === TYPES.SELECT || type === TYPES.MULTI_SELECT;
}
