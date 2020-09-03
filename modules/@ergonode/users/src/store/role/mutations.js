/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';

export const types = {
    SET_ROLE_PRIVILEGES: 'SET_ROLE_PRIVILEGES',
};

export default {
    [types.SET_ROLE_PRIVILEGES](state, value) {
        state.privileges = isObject(value) ? {
            ...value,
        } : value;
    },
};
