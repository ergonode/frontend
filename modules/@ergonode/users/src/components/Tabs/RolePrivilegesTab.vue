/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ResponsiveCenteredViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :rows="rows"
                :drafts="drafts"
                :data-count="dataCount"
                :is-editable="isAllowedToUpdate"
                :is-border="true"
                :is-footer-visible="false"
                @cellValue="onCellValueChange" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Grid from '@Core/components/Grid/Grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import PRIVILEGES from '@Users/config/privileges';
import privilegesDefaults from '@Users/defaults/privileges';
import {
    getMappedGridData,
} from '@Users/models/gridDataMapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'RolePrivilegesTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid,
    },
    mixins: [
        gridDraftMixin,
    ],
    data() {
        return {
            columns: [],
            rows: {},
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
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]);
        },
    },
    watch: {
        privileges: {
            deep: true,
            immediate: true,
            handler() {
                this.updateGridData();
            },
        },
    },
    methods: {
        ...mapActions('roles', [
            '__setState',
        ]),
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId, columnId, value,
            }) => {
                if (columnId !== 'read' && value) {
                    drafts[`${rowId}/read`] = true;
                }

                if (columnId === 'read') {
                    drafts[`${rowId}/create`] = false;
                    drafts[`${rowId}/update`] = false;
                    drafts[`${rowId}/delete`] = false;
                }

                drafts[`${rowId}/${columnId}`] = value;
            });

            this.setDrafts(drafts);
            this.__setState({
                key: 'drafts',
                value: this.drafts,
            });
        },
        updateGridData() {
            const {
                rows, columns,
            } = getMappedGridData({
                fullDataList: this.privilegesDictionary,
                selectedData: this.privileges,
                defaults: privilegesDefaults,
                isEditable: true,
            });
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
            const sortedColumns = config
                ? getSortedColumnsByIDs(columns, config.split(','))
                : columns;

            this.columns = sortedColumns;
            this.dataCount = this.privilegesDictionary.length;
            this.rows = rows;
        },
    },
};
</script>
