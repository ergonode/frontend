/* eslint-disable no-throw-literal */
/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    SKU_MODEL_ID,
} from '@Attributes/defaults/attributes';

export const prepareTemplateData = ({
    $this,
}) => {
    const {
        defaultTextAttribute,
        defaultImageAttribute,
    } = $this.state.productTemplate;

    return {
        defaultLabel: defaultTextAttribute !== SKU_MODEL_ID
            ? defaultTextAttribute
            : null,
        defaultImage: defaultImageAttribute,
    };
};

export const setTemplateData = ({
    $this, data,
}) => {
    const {
        default_label: defaultLabel,
        default_image: defaultImage,
    } = data;

    $this.commit('productTemplate/__SET_STATE', {
        key: 'defaultTextAttribute',
        value: defaultLabel || SKU_MODEL_ID,
    });
    $this.commit('productTemplate/__SET_STATE', {
        key: 'defaultImageAttribute',
        value: defaultImage,
    });
};
