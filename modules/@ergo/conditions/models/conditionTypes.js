/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { TYPES } from '@Conditions/defaults/conditionsDesigner';

export function hasOptions(type) {
    return type === TYPES.SELECT || type === TYPES.MULTI_SELECT;
}
