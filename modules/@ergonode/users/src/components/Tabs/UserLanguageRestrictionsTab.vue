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
                :is-editable="isEditingAllowed"
                :is-border="true"
                :is-footer-visible="false"
                @cellValue="onCellValueChange" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Grid from '@Core/components/Grid/Grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import draftGridMixin from '@Core/mixins/grid/draftGridMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import privilegeDefaults from '@Users/defaults/privileges';
import {
    getMappedGridData,
    getMappedRestrictions,
} from '@Users/models/gridDataMapper';
import {
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'UserLanguageRestrictionsTab',
    components: {
        ResponsiveCenteredViewTemplate,
        Grid,
    },
    mixins: [
        draftGridMixin,
    ],
    data() {
        return {
            columns: [],
            rows: {},
            dataCount: 0,
        };
    },
    computed: {
        ...mapGetters('core', [
            'getActiveLanguages',
        ]),
        ...mapState('users', {
            languagePrivilegesCollection: state => state.languagePrivilegesCollection,
        }),
        isEditingAllowed() {
            return this.$hasAccess([
                'USER_UPDATE',
            ]);
        },
    },
    watch: {
        languagePrivilegesCollection: {
            deep: true,
            immediate: true,
            handler() {
                this.updateGridData();
            },
        },
    },
    methods: {
        onCellValueChange({
            rowId, columnId, value,
        }) {
            const drafts = {};

            value.forEach(({
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
        },
        updateGridData() {
            const fullDataList = this.getActiveLanguages.map(({
                name, code,
            }) => ({
                name,
                description: code,
                privileges: {
                    edit: `${code}_EDIT`,
                    read: `${code}_READ`,
                },
            }));
            const {
                rows, columns,
            } = getMappedGridData({
                fullDataList,
                selectedData: getMappedRestrictions(this.languagePrivilegesCollection),
                defaults: privilegeDefaults,
                isEditable: true,
            });
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
            const sortedColumns = config
                ? getSortedColumnsByIDs(columns, config.split(','))
                : columns;

            this.columns = sortedColumns;
            this.dataCount = fullDataList.length;
            this.rows = rows;
        },
    },
};
</script>
