/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import extendsModules from '~/.nuxt/extends.modules';

const dictionaries = Object.values(extendsModules)
    .reduce((acc, current) => {
        let connectedArray = acc;

        if (current.dictionaries) {
            connectedArray = [
                ...acc,
                ...current.dictionaries,
            ];
        }
        return connectedArray;
    }, []);

export default () => dictionaries.reduce((acc, current) => ({
    ...acc,
    [current.stateProp]: current.defaultValue
}), {});
