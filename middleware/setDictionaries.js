/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty } from '~/model/objectWrapper';

export default function ({ store }) {
    const { data, authentication } = store.state;

    if (authentication.jwt && authentication.user) {
        let emptyState = 0;
        Object.values(data).forEach((value) => {
            if (Array.isArray(value) && value.length === 0) {
                emptyState += 1;
            }
            if (!Array.isArray(value) && isEmpty(value)) {
                emptyState += 1;
            }
        });
        if (emptyState > 0) {
            return store.dispatch('data/getDictionaries');
        }
    }

    return null;
}
