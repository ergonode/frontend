/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-editable="false"
        :is-border="true" />
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import Grid from '@UI/components/Grid/Grid';
import privilegesDefaults from '@Users/defaults/privileges';
import {
    getMappedGridData,
} from '@Users/models/gridDataMapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserPrivilegesGrid',
    components: {
        Grid,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await this.getInitialDictionaries({
            keys: [
                'privileges',
            ],
        });

        const {
            rows,
            columns,
        } = getMappedGridData({
            fullDataList: this.dictionaryPrivileges,
            selectedData: this.privileges,
            defaults: privilegesDefaults,
        });
        const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
        const sortedColumns = getSortedColumnsByIDs(columns, config.split(','));

        this.filtered = this.dictionaryPrivileges.length;
        this.columns = sortedColumns;
        this.rows = rows;
        this.isPrefetchingData = false;
    },
    data() {
        const {
            filterValues,
            pagination,
            sortOrder,
        } = getDefaultDataFromQueryParams(this.$route);

        return {
            filterValues,
            pagination,
            sortOrder,
            rows: [],
            columns: [],
            filtered: 0,
            isPrefetchingData: true,
        };
    },
    computed: {
        ...mapState('authentication', {
            privileges: state => state.user.privileges,
        }),
        ...mapState('dictionaries', {
            dictionaryPrivileges: state => state.privileges,
        }),
    },
    methods: {
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
    },
};
</script>
