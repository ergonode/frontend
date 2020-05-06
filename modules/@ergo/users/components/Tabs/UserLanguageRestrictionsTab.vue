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
import languagesDefaults from '@Users/defaults/languages';
import { getMappedGridData, getMappedRestrictions } from '@Users/models/gridDataMapper';
import { getSortedColumnsByIDs } from '@Core/models/mappers/gridDataMapper';
import Grid from '@Core/components/Grid/Grid';
import ResponsiveCenteredViewTemplate from '@Core/components/Layout/Templates/ResponsiveCenteredViewTemplate';

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
        ...mapState('dictionaries', {
            languages: state => state.languages,
        }),
        ...mapState('users', {
            languagePrivilegesCollection: state => state.languagePrivilegesCollection,
        }),
        isEditingAllowed() {
            return this.$hasAccess(['USER_UPDATE']);
        },
    },
    watch: {
        languagePrivilegesCollection: {
            deep: true,
            handler() {
                this.updateGridData();
            },
        },
    },
    created() {
        this.updateGridData();
    },
    methods: {
        updateGridData() {
            const fullDataList = Object.keys(this.languages).map(languageKey => ({
                name: this.languages[languageKey],
                description: languageKey,
                privileges: { edit: `${languageKey}_EDIT`, read: `${languageKey}_READ` },
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
