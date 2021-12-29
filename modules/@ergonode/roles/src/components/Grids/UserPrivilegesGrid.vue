/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :data-count="filtered"
        :rows="rows"
        :extended-components="extendedGridComponents"
        :is-prefetching-data="isPrefetchingData"
        :is-editable="false"
        :is-border="true"
        v-bind="extendedProps['grid']">
        <template #actionsHeader="actionsHeaderProps">
            <Component
                v-for="(headerItem, index) in extendedActionHeader"
                :is="headerItem.component"
                :key="index"
                v-bind="bindingProps({
                    props: {
                        ...actionsHeaderProps,
                        ...headerItem.props,
                    },
                })" />
        </template>
        <template #appendFooter>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
        </template>
    </Grid>
</template>

<script>
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getDefaultDataFromQueryParams,
    getFilterQueryParams,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import PRIVILEGES from '@Roles/config/privileges';
import privilegesDefaults from '@Roles/defaults/privileges';
import {
    getMappedGridData,
} from '@Users/models/gridDataMapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserPrivilegesGrid',
    mixins: [
        extendPropsMixin({
            extendedKey: '@Roles/components/Grids/UserPrivilegesGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
    },
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

        this.filtered = this.dictionaryPrivileges.length;
        this.columns = getSortedColumnsByIDs(columns, this.$gridCookies.get().split(','));
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
        extendedActionHeader() {
            return this.$getExtendSlot('@Roles/components/Grids/UserPrivilegesGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Roles/components/Grids/UserPrivilegesGrid/footer');
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]);
        },
    },
    methods: {
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        bindingProps({
            props = {},
        }) {
            const query = getFilterQueryParams(this.$route.query);

            return {
                disabled: !this.isAllowedToUpdate,
                query: query.replace(/\[|\]/g, ''),
                ...props,
            };
        },
    },
};
</script>
