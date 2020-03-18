/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty, getKeyByValue } from '@Core/models/objectWrapper';
import { ALERT_TYPE } from '@Core/defaults/alerts';
import {
    getParsedParameterKeys,
    getParsedOptions,
} from '@Attributes/models/attributeMapper';
import { isMultilingual, getParamsOptionsForType } from '@Attributes/models/attributeTypes';

export default function ({
    $axios,
    $addAlert,
    $store,
}) {
    const {
        code,
        groups,
        type,
        multilingual,
        parameter,
        options,
    } = $store.state.attribute;
    const { language } = $store.state.authentication.user;
    const { attrTypes } = $store.state.dictionaries;
    const typeKey = getKeyByValue(attrTypes, type);
    const data = {
        code,
        type: typeKey,
        groups: groups.map(group => group.id),
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

        data.options = getParsedOptions(options);
    }
    if (parameter) {
        const paramKey = getKeyByValue(getParamsOptionsForType(
            typeKey,
            $store.state.dictionaries,
        ), parameter);

        data.parameters = getParsedParameterKeys({
            selectedType: typeKey,
            selectedParam: paramKey,
        });
    }

    return $axios.$post(`${language}/attributes`, data);
}
