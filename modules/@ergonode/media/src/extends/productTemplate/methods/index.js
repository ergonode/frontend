/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setImage = ({
    $this, data,
}) => {
    const {
        image_id: imageID,
    } = data;

    if (imageID) {
        $this.commit('productTemplate/__SET_STATE', {
            key: 'image',
            value: imageID,
        });
    }
};

export const getImage = ({
    $this,
}) => {
    const {
        image = null,
    } = $this.state.productTemplate;

    return {
        image,
    };
};
