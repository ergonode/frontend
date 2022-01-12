/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const setWorkflowTransition = ({
    $this,
    data,
}) => {
    const {
        role_ids: roleIds,
    } = data;

    if (roleIds) {
        $this.commit('workflow/__SET_STATE', {
            key: 'roles',
            value: roleIds,
        });
    }
};

export const getWorkflowTransition = ({
    $this,
}) => {
    const {
        roles,
    } = $this.state.workflow;

    return {
        roles,
    };
};
