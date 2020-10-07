/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const getBindings = ({
    $axios,
    id,
}) => $axios.$get(`products/${id}/bindings`);
