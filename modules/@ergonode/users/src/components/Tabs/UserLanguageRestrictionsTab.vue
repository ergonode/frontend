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
                :data-count="dataCount"
                :is-editable="isEditingAllowed"
                :is-border="true"
                :is-footer-visible="false" />
        </template>
    </ResponsiveCenteredViewTemplate>
</template>

<script>
import Grid from '@Core/components/Grid/Grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import languagesDefaults from '@Users/defaults/languages';
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
    data() {
        return {
            columns: [],
            data: {},
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
                data, columns,
            } = getMappedGridData({
                fullDataList,
                selectedData: getMappedRestrictions(this.languagePrivilegesCollection),
                defaults: languagesDefaults,
                isEditable: true,
            });
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
            const sortedColumns = config
                ? getSortedColumnsByIDs(columns, config.split(','))
                : columns;

            this.columns = sortedColumns;
            this.dataCount = fullDataList.length;
            this.data = data;
        },
    },
};
</script>
