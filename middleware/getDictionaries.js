/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { isEmpty } from '@Core/models/objectWrapper';

export default function ({ store }) {
    const { dictionaries } = store.state;
    let emptyState = 0;

    Object.values(dictionaries).forEach((value) => {
        if (Array.isArray(value) && value.length === 0) {
            emptyState += 1;
        }
        if (!Array.isArray(value) && isEmpty(value)) {
            emptyState += 1;
        }
    });
    if (emptyState > 0) {
        return store.dispatch('dictionaries/getDictionaries');
    }

    return null;
}
