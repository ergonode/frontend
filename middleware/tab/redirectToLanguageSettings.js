/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ route, redirect }) {
    const { name } = route;
    if (name === 'settings') {
        return redirect(`${route.path}/language`);
    }

    return null;
}
