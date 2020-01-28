/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export default function ({ store, redirect }) {
    if (!store.state.authentication.isLogged) {
        return redirect('/');
    }
    return null;
}
