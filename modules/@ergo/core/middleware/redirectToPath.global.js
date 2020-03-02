/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty } from '@Core/models/objectWrapper';

export default ({
    route, redirect,
}) => {
    const { matched, name } = route;
    const routeMatched = matched.find(
        match => match.name === name,
    );

    if (routeMatched && !isEmpty(routeMatched.meta) && routeMatched.meta.redirectTo) {
        redirect({ name: routeMatched.meta.redirectTo });
    }
};
