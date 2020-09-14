/* eslint-disable no-throw-literal */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createOption,
} from '@Attributes/services/attribute';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getKeyByValue,
    isEmpty,
    isObject,
} from '@Core/models/objectWrapper';

export const prepareParametersData = ({
    $this,
    typeConfig,
}) => {
    const {
        parameters,
    } = $this.state.attribute;

    if (typeConfig.params && isObject(typeConfig.params)) {
        const {
            value: paramsOptions,
            key: paramKey,
            fieldName,
        } = typeConfig.params;
        let selectedParam = null;

        // TODO:(DICTIONARY_TYPE) remove condition when dictionary data consistency
        if (Array.isArray(paramsOptions)) {
            selectedParam = parameters
                ? paramsOptions.find(option => option.name === parameters).id
                : null;
        } else {
            selectedParam = getKeyByValue(paramsOptions, parameters) || null;
        }

        if (isObject(selectedParam)) {
            return {
                [fieldName]: {
                    [paramKey]: Object.keys(selectedParam),
                },
            };
        }

        return {
            [fieldName]: {
                [paramKey]: selectedParam,
            },
        };
    }
    return {};
};

export const prepareTextAreaData = ({
    $this, typeConfig,
}) => {
    const {
        parameters,
    } = $this.state.attribute;
    const {
        key: paramKey,
        fieldName,
    } = typeConfig.params;

    return {
        [fieldName]: {
            [paramKey]: parameters || false,
        },
    };
};

export const prepareOptionsData = ({
    $this,
}) => {
    const {
        options,
    } = $this.state.attribute;

    if (!isEmpty(options)) {
        const optionKeys = Object.keys(options);
        const uniqueOptions = new Set(optionKeys);
        let msg = '';

        if (Object.values(options).some(({
            key,
        }) => key === null)) {
            msg = 'Options cannot have an empty keys';

            $this.$addAlert({
                type: ALERT_TYPE.WARNING,
                message: msg,
            });

            throw {
                data: {
                    errors: {
                        options: [
                            msg,
                        ],
                    },
                    message: 'Form validation error',
                },
            };
        }

        if (optionKeys.length !== uniqueOptions.size) {
            msg = 'Option code must be unique';

            $this.$addAlert({
                type: ALERT_TYPE.WARNING,
                message: msg,
            });

            throw {
                data: {
                    errors: {
                        options: [
                            msg,
                        ],
                    },
                    message: 'Form validation error',
                },
            };
        }
    }
};

export const sendOptionsData = async ({
    $this, data,
}) => {
    const {
        options,
    } = $this.state.attribute;
    const {
        id,
    } = data;

    await Promise.all(
        Object.keys(options).map(key => createOption({
            $axios: $this.app.$axios,
            id,
            data: {
                code: options[key].key,
            },
        })),
    );
};

export const setParametersData = ({
    $this, data, typeConfig,
}) => {
    const {
        value: paramOptions,
        fieldName,
    } = typeConfig.params;
    const [
        parsedParameters,
    ] = Object.values(data[fieldName]);
    let parsedData = null;

    if (Array.isArray(paramOptions)) {
        parsedData = paramOptions.find(option => option.id === parsedParameters).name;
    } else {
        parsedData = paramOptions[parsedParameters];
    }

    $this.commit('attribute/__SET_STATE', {
        key: fieldName,
        value: parsedData,
    });
};

export const setTextAreaData = ({
    $this, data, typeConfig,
}) => {
    const {
        fieldName,
    } = typeConfig.params;

    // TODO:(BACKEND CHANGE) on GET request we have `rich_edit` but on POST we send `richEdit`
    $this.commit('attribute/__SET_STATE', {
        key: fieldName,
        value: data[fieldName].rich_edit,
    });
};
