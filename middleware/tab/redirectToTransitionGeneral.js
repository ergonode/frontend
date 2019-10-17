/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ route, redirect }) {
    const { name } = route;

    if (name === 'transition-new' || name === 'transition-edit-source-destination') {
        return redirect(`${route.path}/general`);
    }

    return null;
}
