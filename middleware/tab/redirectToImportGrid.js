/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ route, redirect }) {
    const { name } = route;

    if (name === 'imports') {
        return redirect(`${route.path}/grid`);
    }

    return null;
}
