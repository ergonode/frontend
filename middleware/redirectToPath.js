/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty } from '~/model/objectWrapper';

export default ({
    route, redirect,
}) => {
    const { matched, name, path } = route;
    const clearPath = path.replace(/\/$/, '');
    const routeMatched = matched.find(
        (match) => match.name === name,
    );

    if (routeMatched && !isEmpty(routeMatched.meta) && routeMatched.meta.redirectTo) {
        redirect(`${clearPath}/${routeMatched.meta.redirectTo}`);
    }
};
