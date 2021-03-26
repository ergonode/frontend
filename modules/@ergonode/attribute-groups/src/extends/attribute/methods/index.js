/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setGroups = ({
    $this,
    data,
}) => {
    const {
        groups = [],
    } = data;

    $this.commit('attribute/__SET_STATE', {
        key: 'groups',
        value: groups,
    });
};

export const getGroups = ({
    $this,
}) => {
    const {
        groups,
    } = $this.state.attribute;

    return {
        groups,
    };
};
