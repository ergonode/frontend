/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendsModules from '~/.nuxt/extends.modules';

const dictionaries = Object.values(extendsModules)
    .reduce((acc, current) => [].concat(...acc, ...current.dictionaries || []), []);

export default () => dictionaries.reduce((acc, current) => {
    const newObject = acc;
    newObject[current.stateProp] = current.dataFormat;
    return newObject;
}, {});
