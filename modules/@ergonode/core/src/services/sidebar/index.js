/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
export const getGroups = async ({
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
            filter: 'elements_count>=1',
            columns: 'id,code,name,elements_count',
        };
        const {
            collection,
        } = await $axios.$get(path, {
            params,
            withLanguage: false,
        });
        const groups = [];
        const {
            length,
        } = collection;

        for (let i = 0; i < length; i += 1) {
            const {
                id,
                code,
                name,
            } = collection[i];

            const value = name || `#${code}`;
            const hint = name ? `#${code} ${languageCode}` : '';

            groups.push({
                id,
                key: code,
                value,
                hint,
                itemsCount: collection[i].elements_count,
                children: [],
            });
        }

        onSuccess({
            groups,
            languageCode,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};

export const getItems = async ({
    $axios,
    path,
    languageCode,
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
            languageCode,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};
