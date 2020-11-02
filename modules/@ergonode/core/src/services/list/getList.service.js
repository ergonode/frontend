/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const getListGroups = async ({
    $axios,
    path,
    languageCode,
    onSuccess = () => {},
    onError = () => {},
}) => {
    try {
        const params = {
            limit: 9999,
            offset: 0,
            view: 'list',
            order: 'ASC',
            field: 'name',
            columns: 'id,code,name,elements_count',
        };
        const {
            collection,
        } = await $axios.$get(path, {
            params,
            withLanguage: false,
        });
        const groups = [];
        const items = {};
        const groupItemsCount = {};
        const {
            length,
        } = collection;

        for (let i = 0; i < length; i += 1) {
            const {
                id,
                code,
                name,
            } = collection[i];

            if (collection[i].elements_count > 0) {
                const value = name || `#${code}`;
                const hint = name ? `#${code} ${languageCode}` : '';

                groups.push({
                    id,
                    key: code,
                    value,
                    hint,
                });

                groupItemsCount[id] = collection[i].elements_count;
                items[id] = [];
            }
        }

        onSuccess({
            groups,
            items,
            groupItemsCount,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};

export const getListItems = async ({
    $axios,
    path,
    params,
    onSuccess = () => {},
    onError = () => {},
}) => {
    try {
        const {
            collection,
            info,
        } = await $axios.$get(path, {
            params,
            withLanguage: false,
        });

        onSuccess({
            items: collection,
            info,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};
