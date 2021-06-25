/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';

export const postGridData = async ({
    $route,
    $cookies,
    $axios,
    path,
    data,
    onSuccess = () => {},
    onError = () => {},
}) => {
    try {
        const {
            collection,
            columns = [],
            info: {
                filtered,
            },
        } = await $axios.$post(path, data);

        const sortedColumns = getSortedColumnsByIDs(columns, data.columns);

        if (columns.length > 0 && !$cookies.get(`GRID_CONFIG:${$route.name}`)) {
            $cookies.set(
                `GRID_CONFIG:${$route.name}`,
                sortedColumns
                    .map(({
                        id,
                    }) => id)
                    .join(','),
            );
        }

        onSuccess({
            columns: sortedColumns,
            rows: collection,
            filtered,
        });
    } catch (e) {
        if ($axios.isCancel(e)) {
            return;
        }

        onError(e);
    }
};
