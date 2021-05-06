/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const getStatuses = ({
    $axios,
}) => $axios.$get('status', {
    params: {
        limit: 99999,
    },
});

export const getTransitions = ({
    $axios,
}) => $axios.$get('workflow/default/transitions', {
    params: {
        limit: 99999,
    },
});
