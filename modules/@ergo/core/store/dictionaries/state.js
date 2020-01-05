/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getModulesConfig } from '~/plugins/moduleLoader';

const { dictionaries } = getModulesConfig;

export default () => dictionaries.reduce((acc, current) => {
    const newObject = acc;
    newObject[current.stateProp] = current.dataFormat;
    return newObject;
}, {});
