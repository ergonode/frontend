/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setRole = ({
    $this,
    data,
}) => {
    const {
        role_id: roleId,
    } = data;

    if (roleId) {
        $this.commit('user/__SET_STATE', {
            key: 'role',
            value: roleId,
        });
    }
};

export const getRole = ({
    $this,
}) => {
    const {
        role,
    } = $this.state.user;

    return {
        roleId: role,
    };
};
