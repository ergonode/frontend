/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { modulesConfig } from '~/plugins/moduleLoader';

const { dictionaries } = modulesConfig;

export default () => dictionaries.reduce((acc, current) => {
    const newObject = acc;
    newObject[current.stateProp] = current.dataFormat;
    return newObject;
}, {});
