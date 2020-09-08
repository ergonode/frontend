/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    TYPES,
} from '@Attributes/defaults/attributes';
import {
    typesConfiguration,
} from '@Attributes/models/attributeTypes';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getKeyByValue,
    isEmpty,
} from '@Core/models/objectWrapper';

export default async function ({
    $this,
    $axios,
    $addAlert,
    $store,
}) {
    const {
        code,
        groups,
        type,
        scope,
        parameter,
        options,
    } = $store.state.attribute;
    const {
        attrTypes,
    } = $store.state.dictionaries;
    const typeKey = type ? getKeyByValue(attrTypes, type) : null;
    const data = {
        code,
        scope,
        type: typeKey,
        groups,
    };

    if (!isEmpty(options)) {
        const optionValues = Object.values(options);
        const uniqueOptions = new Set(optionValues.map(({
            key,
        }) => (key)));

        if (optionValues.some(({
            key,
        }) => key === null)) {
            $addAlert({
                type: ALERT_TYPE.WARNING,
                message: 'Options cannot have an empty keys',
            });
            throw new Error();
        }

        if (optionValues.length !== uniqueOptions.size) {
            $addAlert({
                type: ALERT_TYPE.WARNING,
                message: 'Option code must be unique',
            });
            throw new Error();
        }
    }

    if (parameter && typeKey !== TYPES.TEXT_AREA) {
        const typesConfig = typesConfiguration.call($this);
        const paramsOptions = typesConfig.getParamsOptionsForType(typeKey);
        let paramKey = null;

        // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
        if (Array.isArray(paramsOptions)) {
            paramKey = paramsOptions.find(option => option.name === parameter).id;
        } else {
            paramKey = getKeyByValue(paramsOptions, parameter);
        }

        data.parameters = typesConfig.getParsedParameterKeys(typeKey, paramKey);
    }

    if (typeKey === TYPES.TEXT_AREA) {
        data.parameters = {
            richEdit: parameter,
        };
    }

    const {
        id,
    } = await $axios.$post('attributes', data);

    await Promise.all(
        Object.keys(options).map(key => $axios.$post(
            `attributes/${id}/options`,
            {
                code: options[key].key,
            },
        )),
    );

    return {
        id,
    };
}
