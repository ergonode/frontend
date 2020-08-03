/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    isObject,
} from '@Core/models/objectWrapper';
import deepmerge from 'deepmerge';

export function typesConfiguration(args = {}) {
    const modulesConfiguration = this.$extendMethods('@Attributes/defaults/attributes', {
        state: args.state || this.$store.state,
    });
    const config = modulesConfiguration.reduce((acc, current) => deepmerge(acc, current), {});

    return {
        hasOptions: type => (config[type] && config[type].hasOptions) || false,
        hasPlaceholder: type => (config[type] && config[type].hasPlaceholder) || false,
        // hasParams: type => (!!((config[type] && config[type].params))),
        getIcon: type => (config[type] && config[type].icon) || null,
        getParamsOptionsForType: type => (
            (config[type] && config[type].params && isObject(config[type].params))
                ? config[type].params.value
                : {}
        ),
        getParamsKeyForType: type => (
            (config[type] && config[type].params && isObject(config[type].params))
                ? config[type].params.key
                : ''
        ),
        getParsedParameterKeys: (type, selectedParam) => {
            if (config[type] && config[type].params && isObject(config[type].params)) {
                const paramKey = config[type].params.key;

                if (isObject(selectedParam)) {
                    return {
                        [paramKey]: Object.keys(selectedParam),
                    };
                }

                return {
                    [paramKey]: selectedParam,
                };
            }
            return {};
        },
        getMappedParameterValues: (type, parameters) => {
            console.log(typeof config[type].params.structure === 'object');
            if (config[type] && config[type].params && isObject(config[type].params)) {
                const paramValue = config[type].params.value;
                const [
                    parsedParameters,
                ] = Object.values(parameters);

                if (Array.isArray(paramValue)) {
                    return paramValue.find(option => option.id === parsedParameters).name;
                }

                return paramValue[parsedParameters];
            }
            return {};
        },
    };
}
