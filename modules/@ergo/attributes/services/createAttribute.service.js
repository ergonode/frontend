/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty, getKeyByValue } from '@Core/models/objectWrapper';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import {
    getParsedParameterKeys,
} from '@Attributes/models/attributeMapper';
import { isMultilingual, getParamsOptionsForType } from '@Attributes/models/attributeTypes';

export default async function ({
    $axios,
    $addAlert,
    $store,
}) {
    const {
        code,
        groups,
        type,
        isMultilingual: multilingual,
        parameter,
        options,
    } = $store.state.attribute;
    const { language } = $store.state.authentication.user;
    const { attrTypes } = $store.state.dictionaries;
    const typeKey = getKeyByValue(attrTypes, type);
    const data = {
        code,
        type: typeKey,
        groups,
    };

    if (isMultilingual(typeKey)) {
        data.multilingual = multilingual;
    }

    if (!isEmpty(options)) {
        const optionKeys = Object.keys(options);
        const uniqueOptions = new Set(optionKeys);

        if (optionKeys.some(key => key === '')) {
            $addAlert({ type: ALERT_TYPE.WARNING, message: 'Options cannot have an empty keys' });
        }

        if (optionKeys.length !== uniqueOptions.size) {
            $addAlert({ type: ALERT_TYPE.WARNING, message: 'Option code must be unique' });
        }
    }

    if (parameter) {
        const paramsOptions = getParamsOptionsForType(typeKey, $store.state.dictionaries);
        let paramKey = null;

        // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
        if (Array.isArray(paramsOptions)) {
            paramKey = paramsOptions.find(option => option.name === parameter).id;
        } else {
            paramKey = getKeyByValue(paramsOptions, parameter);
        }

        data.parameters = getParsedParameterKeys({
            selectedType: typeKey,
            selectedParam: paramKey,
        });
    }

    const { id } = await $axios.$post(`${language}/attributes`, data);
    await Promise.all(
        Object.keys(options).map(key => $axios.$post(
            `${language}/attributes/${id}/options`,
            { code: options[key].key },
        )),
    );

    return { id };
}
