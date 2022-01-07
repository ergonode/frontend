/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setCategory = ({
    $this, data,
}) => {
    const {
        categories = '',
    } = data;

    if (categories) {
        $this.commit('product/__SET_STATE', {
            key: 'categories',
            value: categories,
        });
    }
};

export const getCategory = ({
    $this,
}) => {
    const {
        categories,
    } = $this.state.product;

    return {
        categoryIds: categories,
    };
};
