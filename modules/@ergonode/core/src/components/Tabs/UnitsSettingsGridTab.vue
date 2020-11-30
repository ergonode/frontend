/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :data-count="filtered"
                :rows="rows"
                :pagination="pagination"
                :filters="filterValues"
                :placeholder="noDataPlaceholder"
                :extended-components="extendedGridComponents"
                :is-editable="isAllowedToUpdate"
                :is-prefetching-data="isPrefetchingData"
                :is-header-visible="true"
                :is-border="true"
                :is-basic-filter="true"
                @edit-row="onEditRow"
                @preview-row="onEditRow"
                @delete-row="onRemoveUnit"
                @pagination="onPaginationChange"
                @column-sort="onColumnSortChange"
                @filter="onFilterChange"
                @remove-all-filters="onRemoveAllFilters">
                <template #actionsHeader>
                    <CreateUnitButton @created="onCreatedData" />
                </template>
            </Grid>
        </template>
    </CenterViewTemplate>
</template>

<script>
import CreateUnitButton from '@Core/components/Buttons/CreateUnitButton';
import PRIVILEGES from '@Core/config/privileges';
import {
    ROUTE_NAME,
} from '@Core/config/routes';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
    WHITESMOKE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'UnitsSettingsGridTab',
    components: {
        CreateUnitButton,
        CenterViewTemplate,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'units',
        }),
        extendedGridComponentsMixin,
    ],
    async fetch() {
        await this.onFetchData();
        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
        };
    },
    computed: {
        noDataPlaceholder() {
            return {
                title: 'No units',
                subtitle: 'There are no units in the system, you can create the first one.',
                bgUrl: require('@UI/assets/images/placeholders/comments.svg'),
                color: WHITESMOKE,
            };
        },
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.SETTINGS.update,
            ]);
        },
    },
    methods: {
        ...mapActions('dictionaries', [
            'getDictionary',
        ]),
        onCreatedData() {
            this.onFetchData();
        },
        onRemoveUnit() {
            Promise.all([
                this.onRemoveRow(),
                this.getDictionary({
                    dictionaryName: 'units',
                }),
            ]);
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
