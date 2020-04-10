/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :data="data"
                :data-count="dataCount"
                :is-editable="isEditingAllowed"
                :is-footer-visible="false" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import { mapState } from 'vuex';
import { getMappedGridData } from '@Users/models/privilegesMapper';
import { getSortedColumnsByIDs } from '@Core/models/mappers/gridDataMapper';
import Grid from '@Core/components/Grid/Grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

export default {
    name: 'RolePrivilegesTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid,
    },
    data() {
        return {
            rowIds: [],
            columns: [],
            data: {},
            dataCount: 0,
        };
    },
    computed: {
        ...mapState('dictionaries', {
            privilegesDictionary: state => state.privileges,
        }),
        ...mapState('roles', {
            privileges: state => state.privileges,
        }),
        isEditingAllowed() {
            return this.$hasAccess(['USER_ROLE_UPDATE']);
        },
    },
    created() {
        const {
            data, columns,
        } = getMappedGridData({
            systemPrivileges: this.privilegesDictionary,
            rolePrivileges: this.privileges,
            isEditable: true,
        });
        const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
        const sortedColumns = config
            ? getSortedColumnsByIDs(columns, config.split(','))
            : columns;

        this.columns = sortedColumns;
        this.dataCount = this.privilegesDictionary.length;
        this.data = data;
    },
};
</script>
