/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
    $this, fieldKey, data,
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
    }) => {
        $this.dispatch('attribute/updateAttributeOptionKey',
            {
                index: fieldKey,
                id: optionId,
                key: options[fieldKey].key,
            });

        return optionId;
    })
        .catch((e) => {
            throw {
                data: {
                    errors: {
                        [`option_${fieldKey}`]: e.data.errors.code,
                    },
                },
            };
        });
};

export const moveOptionHelper = ({
    $this, fieldKey, data,
}) => {
    const {
        id: attributeId,
        options,
    } = $this.state.attribute;

    return moveOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId: options[fieldKey].id,
        data,
    }).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${fieldKey}`]: e.data.errors.code,
                },
            },
        };
    });
};

export const updateOptionHelper = ({
    $this, fieldKey, data,
}) => {
    const {
        id: attributeId,
        options,
    } = $this.state.attribute;

    return updateOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId: options[fieldKey].id,
        data,
    }).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${fieldKey}`]: e.data.errors.code,
                },
            },
        };
    });
};

export const removeOptionHelper = ({
    $this, fieldKey, optionId,
}) => {
    const {
        id: attributeId,
    } = $this.state.attribute;

    return removeOption({
        $axios: $this.app.$axios,
        attributeId,
        optionId,
    }).then(
        () => $this.dispatch('attribute/removeAttributeOptionKey', fieldKey),
    ).catch((e) => {
        throw {
            data: {
                errors: {
                    [`option_${fieldKey}`]: e.data.errors.code,
                },
            },
        };
    });
};
