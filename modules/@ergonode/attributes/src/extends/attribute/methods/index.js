/* eslint-disable no-throw-literal */
/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    createOption,
    updateOption,
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
    } = $this.state.attribute;
    const optionKeys = Object.keys(options);

    if (optionKeys.length > 0) {
        const optionValues = Object.values(options);
        const errors = {};
        let isAnyError = false;

        optionKeys.forEach((optionKey) => {
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

export const updateOptionsData = async ({
    $this,
}) => {
    const {
        id,
        options,
        updatedOptions,
    } = $this.state.attribute;
    const optionKeys = Object.keys(options);
    const addOptionsRequests = [];
    const updateOptionsRequests = [];

    optionKeys.forEach((key) => {
        const option = options[key];
        const optionValue = option.value || null;

        if (!option.id) {
            addOptionsRequests.push(
                createOption({
                    $axios: $this.app.$axios,
                    id,
                    data: {
                        code: option.key,
                        label: optionValue,
                    },
                })
                    .then(({
                        id: optionId,
                    }) => $this.dispatch('attribute/updateAttributeOptionKey',
                        {
                            index: key,
                            id: optionId,
                            key: option.key,
                        }))
                    .catch((e) => {
                        throw {
                            data: {
                                errors: {
                                    [`option_${key}`]: e.data.errors.code,
                                },
                            },
                        };
                    }),
            );
        } else if (updatedOptions[option.id]) {
            updateOptionsRequests.push(
                updateOption({
                    $axios: $this.app.$axios,
                    attributeId: id,
                    optionId: option.id,
                    data: {
                        code: option.key,
                        label: optionValue,
                    },
                }).catch((e) => {
                    throw {
                        data: {
                            errors: {
                                [`option_${key}`]: e.data.errors.code,
                            },
                        },
                    };
                }),
            );
        }
    });

    await Promise.all([
        ...addOptionsRequests,
        ...updateOptionsRequests,
    ]);
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
