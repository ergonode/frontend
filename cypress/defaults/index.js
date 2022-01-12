/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

export const requestTypes = {
    get: 'GET',
    create: 'POST',
    update: 'PUT',
    delete: 'DELETE',
};

export const statusCodes = {
    GET: {
        correct: 200,
        incorrect: 404,
    },
    POST: {
        correct: 201,
        incorrect: 400,
    },
    PUT: {
        correct: 204,
        incorrect: 400,
    },
    DELETE: {
        correct: 204,
        incorrect: 400,
    },
};
