/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty } from '~/model/objectWrapper';

export default function ({ store }) {
    const { data, authentication } = store.state;

    if (authentication.jwt && authentication.user) {
        let emptyState = 0;
        Object.entries(data).forEach(([, value]) => {
            if (Array.isArray(value) && value.length === 0) {
                emptyState += 1;
            }
            if (!Array.isArray(value) && isEmpty(value)) {
                emptyState += 1;
            }
        });
        // TODO: downloading data when the dictionary does not exist, not for all dictionary.
        if (emptyState > 0) {
            return store.dispatch('data/getDictionaries');
        }
    }

    return null;
}
