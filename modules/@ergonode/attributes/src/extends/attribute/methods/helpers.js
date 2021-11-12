/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

/* eslint-disable no-throw-literal */
import {
    createOption,
    moveOption,
    removeOption,
    updateOption,
} from '@Attributes/extends/attribute/services';

export const createOptionHelper = async ({
    $this, keyField, data,
}) => {
    const {
        id: attributeId,
        options,
    } = $this.state.attribute;

    return createOption({
        $axios: $this.app.$axios,
        attributeId,
        data,
    }).then(({
        id: optionId,
    }) => $this.dispatch('attribute/updateAttributeOptionKey',
        {
            index: keyField,
            id: optionId,
            key: options[keyField].key,
        }))
        .catch((e) => {
            throw {
                data: {
                    errors: {
                        [`option_${keyField}`]: e.data.errors.code,
                    },
                },
            };
        });
};

export const moveOptionHelper = ({
    $this, keyField, data,
}) => {
    const {
        id: attributeId,
        options,
    } = $this.state.attribute;

    return moveOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId: options[keyField].id,
        data,
    }).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${keyField}`]: e.data.errors.code,
                },
            },
        };
    });
};

export const updateOptionHelper = ({
    $this, keyField, data,
}) => {
    const {
        id: attributeId,
        options,
    } = $this.state.attribute;

    return updateOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId: options[keyField].id,
        data,
    }).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${keyField}`]: e.data.errors.code,
                },
            },
        };
    });
};

export const removeOptionHelper = ({
    $this, keyField, optionId,
}) => {
    const {
        id: attributeId,
    } = $this.state.attribute;

    return removeOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId,
    }).then(
        () => $this.dispatch('attribute/removeAttributeOptionKey', keyField),
    ).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${keyField}`]: e.data.errors.code,
                },
            },
        };
    });
};
