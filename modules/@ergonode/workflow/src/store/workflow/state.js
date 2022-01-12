/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default () => ({
    id: null,
    code: '',
    defaultStatus: null,
    status: {
        id: '',
        code: '',
        color: '',
        isDefaultStatus: false,
    },
    transition: {
        from: '',
        to: '',
    },
    statuses: [],
    transitions: [],
});
