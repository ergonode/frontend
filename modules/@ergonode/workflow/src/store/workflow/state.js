/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default () => ({
    status: {
        id: '',
        code: '',
        color: '',
        isDefaultStatus: false,
    },
    transition: {
        source: '',
        destination: '',
        conditionSetId: '',
    },
    statuses: [],
    transitions: [],
});
