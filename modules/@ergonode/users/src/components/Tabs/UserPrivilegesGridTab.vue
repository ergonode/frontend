/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :rows="rows"
                :data-count="dataCount"
                :is-editable="false"
                :is-border="true"
                :is-footer-visible="false" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import Grid from '@Core/components/Grid/Grid';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import privilegesDefaults from '@Users/defaults/privileges';
import {
    getMappedGridData,
} from '@Users/models/gridDataMapper';

export default {
    name: 'UserPrivilegesGridTab',
    components: {
        CenterViewTemplate,
        Grid,
    },
    asyncData({
        app, store, route,
    }) {
        const {
            privileges: privilegesDictionary,
        } = store.state.dictionaries;
        const {
            privileges,
        } = store.state.authentication.user;
        const {
            rows, columns,
        } = getMappedGridData({
            fullDataList: privilegesDictionary,
            selectedData: privileges,
            defaults: privilegesDefaults,
        });
        const config = app.$cookies.get(`GRID_CONFIG:${route.name}`);
        const sortedColumns = config
            ? getSortedColumnsByIDs(columns, config.split(','))
            : columns;

        return {
            dataCount: privilegesDictionary.length,
            columns: sortedColumns,
            rows,
        };
    },
};
</script>
