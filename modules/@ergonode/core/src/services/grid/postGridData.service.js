/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';

export const postGridData = async ({
    $cookies,
    $axios,
    layout,
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

        const sortedColumns = getSortedColumnsByIDs(
            columns,
            data.columns.map((column) => {
                if (column.language) {
                    return `${column.name}:${column.language}`;
                }

                return `${column.name}`;
            }),
        );

        if ($cookies && columns.length > 0 && !$cookies.get(layout)) {
            $cookies.set(
                layout,
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
