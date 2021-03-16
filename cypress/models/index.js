/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const MultiSteps = (steps, message, callback) => {
    steps.forEach((step) => {
        step(message, callback);
    });
};
