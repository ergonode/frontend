/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setTransition = ({
    $this,
    data,
}) => {
    const {
        role_ids: roleIds,
    } = data;

    if (roleIds) {
        $this.commit('statusTransition/__SET_STATE', {
            key: 'roles',
            value: roleIds,
        });
    }
};

export const getTransition = ({
    $this,
}) => {
    const {
        roles,
    } = $this.state.statusTransition;

    return {
        roles,
    };
};
