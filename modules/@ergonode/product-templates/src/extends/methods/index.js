/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setTemplate = ({
    $this,
    data,
}) => {
    const {
        template_id: templateId,
    } = data;

    if (templateId) {
        $this.commit('product/__SET_STATE', {
            key: 'template',
            value: templateId,
        });
    }
};

export const getTemplate = ({
    $this,
}) => {
    const {
        template,
    } = $this.state.product;

    return {
        templateId: template,
    };
};
