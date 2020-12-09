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
                :extended-components="extendedGridComponents"
                :is-editable="false"
                :is-border="true"
                :is-footer-visible="false" />
        </template>
    </CenterViewTemplate>
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import Grid from '@UI/components/Grid/Grid';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
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
    mixins: [
        extendedGridComponentsMixin,
    ],
    async asyncData({
        app,
        store,
        route,
    }) {
        await store.dispatch('dictionaries/getInitialDictionaries', {
            keys: [
                'privileges',
            ],
        });

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
