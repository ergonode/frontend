/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
        :is-border="true"
        v-bind="extendedProps['grid']" />
</template>

<script>
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import privilegesDefaults from '@Roles/defaults/privileges';
import Grid from '@UI/components/Grid/Grid';
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
        extendPropsMixin({
            extendedKey: '@Roles/components/Grids/UserPrivilegesGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
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
        const config = this.$userCookies.get(`GRID_CONFIG:${this.$route.name}`) || '';

        this.filtered = this.dictionaryPrivileges.length;
        this.columns = getSortedColumnsByIDs(columns, config.split(','));
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
