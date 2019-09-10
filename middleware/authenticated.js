/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ store, redirect }) {
    if (!(store.state.authentication.jwt && store.state.authentication.user)) {
        return redirect('/');
    }
    return null;
}
