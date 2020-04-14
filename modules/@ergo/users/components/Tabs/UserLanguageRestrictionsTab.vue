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
import { getMappedGridData } from '@Users/models/gridDataMapper';
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
            rowIds: [],
            columns: [],
            data: {},
            dataCount: 0,
            languages: [
                { name: 'pl_PL', description: 'polski', restriction: { edit: 'pl_PL_EDIT', preview: 'pl_PL_PREVIEW' } },
                { name: 'en_US', description: 'angielski', restriction: { edit: 'en_US_EDIT', preview: 'en_US_PREVIEW' } },
                { name: 'US', description: 'amarykanski', restriction: { edit: 'US_EDIT', preview: 'US_PREVIEW' } },
                { name: 'XX', description: 'xx', restriction: { edit: 'XX_EDIT', preview: 'XX_PREVIEW' } },
            ],
            // languageRestrictions: { PL_pl_EDIT: true, PL_pl_PREVIEW: true, XX_EDIT: true },
        };
    },
    computed: {
        // TODO: remove mock when API will be ready
        // ...mapState('dictionaries', {
        //     languages: state => state.languages,
        // }),
        ...mapState('users', {
            languageRestrictions: state => state.languageRestrictions,
        }),
        isEditingAllowed() {
            return this.$hasAccess(['USER_UPDATE']);
        },
    },
    created() {
        const {
            data, columns,
        } = getMappedGridData({
            fullDataList: this.languages,
            selectedData: this.languageRestrictions,
            defaults: languagesDefaults,
            isEditable: true,
        });
        const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
        const sortedColumns = config
            ? getSortedColumnsByIDs(columns, config.split(','))
            : columns;

        this.columns = sortedColumns;
        this.dataCount = this.languages.length;
        this.data = data;
    },
};
</script>
