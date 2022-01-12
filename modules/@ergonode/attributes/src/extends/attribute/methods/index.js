/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import {
    OPTION_STATES,
} from '@Attributes/defaults';
import {
    createOptionHelper,
    moveOptionHelper,
    removeOptionHelper,
    updateOptionHelper,
} from '@Attributes/extends/attribute/methods/helpers';
import {
    createOption,
} from '@Attributes/extends/attribute/services';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getKeyByValue,
    isObject,
} from '@Core/models/objectWrapper';

export const prepareParametersData = ({
    $this,
    typeConfig,
}) => {
    const {
        parameters,
    } = $this.state.attribute;

    if (isObject(typeConfig.params)) {
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
        optionsOrder,
    } = $this.state.attribute;

    if (optionsOrder.length > 0) {
        const optionValues = optionsOrder.reduce((prev, curr) => [
            ...prev,
            options[curr],
        ], []);
        const errors = {};
        let isAnyError = false;

        optionsOrder.forEach((optionKey) => {
            const fieldKey = `option_${optionKey}`;
            const duplications = optionValues
                .filter(({
                    key,
                }) => key === options[optionKey].key);

            if (duplications.length > 1) {
                errors[fieldKey] = [
                    $this.app.i18n.t('@Attributes.attributeExtend.methods.optionUniq'),
                ];
                isAnyError = true;
            }
            if (!options[optionKey].key) {
                errors[fieldKey] = [
                    $this.app.i18n.t('@Attributes.attributeExtend.methods.optionEmpty'),
                ];
                isAnyError = true;
            }
        });
        if (isAnyError) {
            throw {
                data: {
                    errors,
                },
            };
        }
    }
};

export const createOptionsData = async ({
    $this, data,
}) => {
    const {
        options,
        optionsOrder,
    } = $this.state.attribute;
    const {
        id: attributeId,
    } = data;
    const starterPromise = Promise.resolve(null);

    await optionsOrder.reduce((request, fieldKey) => request.then(() => {
        const option = options[fieldKey];

        return createOption({
            $axios: $this.app.$axios,
            attributeId,
            data: {
                code: option.key,
                label: option.value,
            },
        }).catch((e) => {
            throw {
                data: {
                    errors: {
                        [`option_${fieldKey}`]: e.data.errors.code,
                    },
                },
            };
        });
    }), starterPromise);
};

export const updateOptionsData = async ({
    $this,
}) => {
    const {
        options,
        optionsState,
        optionsOrder,
    } = $this.state.attribute;
    const createdOptions = {};

    await Promise.all(
        Object
            .keys(optionsState)
            .filter(
                state => OPTION_STATES.DELETE in optionsState[state]
                    && optionsState[state][OPTION_STATES.DELETE].id !== null,
            )
            .map(fieldKey => removeOptionHelper({
                $this,
                fieldKey,
                optionId: options[fieldKey].id,
            })),
    );

    const starterPromise = Promise.resolve(null);

    await optionsOrder.reduce((request, fieldKey, index) => request.then(async () => {
        const optionStates = optionsState[fieldKey] || {};
        const option = options[fieldKey];
        const isAdded = OPTION_STATES.ADD in optionStates;
        const isEdited = OPTION_STATES.EDIT in optionStates;
        const isMoved = OPTION_STATES.MOVE in optionStates;
        const prevIndex = Math.max(0, index - 1);
        const positionId = index === 0
            ? null
            : createdOptions[optionsOrder[prevIndex]] || options[optionsOrder[prevIndex]].id;

        if (isAdded) {
            createdOptions[fieldKey] = await createOptionHelper({
                $this,
                fieldKey,
                data: {
                    code: option.key,
                    label: option.value,
                    after: index > 0,
                    positionId,
                },
            });
        } else {
            const requests = [];

            if (isMoved) {
                requests.push(moveOptionHelper({
                    $this,
                    fieldKey,
                    data: {
                        after: index > 0,
                        positionId,
                    },
                }));
            }

            if (isEdited) {
                requests.push(updateOptionHelper({
                    $this,
                    fieldKey,
                    data: {
                        code: option.key,
                        label: option.value,
                    },
                }));
            }

            await Promise.all(requests);
        }

        return null;
    }), starterPromise);
};

export const getAttributeOptions = async ({
    $this, data,
}) => {
    const {
        id,
    } = data;

    await $this.dispatch('attribute/getAttributeOptions', {
        id,
        onError: () => {
            $this.$addAlert({
                type: ALERT_TYPE.ERROR,
                message: $this.app.i18n.t('@Attributes.attributeExtend.methods.getOptionRequest'),
            });
        },
    });
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

export const setTranslation = ({
    $this, data,
}) => {
    const {
        placeholder = '',
    } = data;

    $this.dispatch('tab/setTranslations', {
        ...$this.state.tab.translations,
        placeholder,
    }, {
        root: true,
    });
};

export const getTranslation = ({
    $this,
}) => {
    const {
        placeholder,
    } = $this.state.tab.translations;

    return {
        placeholder,
    };
};
