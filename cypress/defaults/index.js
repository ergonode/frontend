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
        correctly: 200,
        incorrectly: 404,
    },
    POST: {
        correctly: 201,
        incorrectly: 400,
    },
    PUT: {
        correctly: 204,
        incorrectly: 400,
    },
    DELETE: {
        correctly: 204,
        incorrectly: 400,
    },
};
