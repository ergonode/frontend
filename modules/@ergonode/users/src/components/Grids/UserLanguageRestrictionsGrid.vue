/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="columns"
        :rows="rows"
        :drafts="drafts"
        :errors="errors"
        :data-count="filtered"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-border="true"
        @cell-value="onCellValueChange">
        <template #footer>
            <div class="language-privileges-footer">
                <UpdateLanguageRestrictionsButton :scope="scope" />
            </div>
        </template>
    </Grid>
</template>

<script>
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import Grid from '@UI/components/Grid/Grid';
import UpdateLanguageRestrictionsButton from '@Users/components/Buttons/UpdateLanguageRestrictionsButton';
import PRIVILEGES from '@Users/config/privileges';
import privilegeDefaults from '@Users/defaults/languages';
import {
    getMappedGridData,
    getMappedRestrictions,
} from '@Users/models/gridDataMapper';
import {
    mapActions,
    mapGetters,
    mapState,
} from 'vuex';

export default {
    name: 'UserLanguageRestrictionsGrid',
    components: {
        Grid,
        UpdateLanguageRestrictionsButton,
    },
    mixins: [
        extendedGridComponentsMixin,
    ],
    props: {
        scope: {
            type: String,
            default: '',
        },
        errors: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            rows: [],
            columns: [],
            filtered: 0,
        };
    },
    computed: {
        ...mapGetters('core', [
            'activeLanguages',
        ]),
        ...mapState('user', [
            'drafts',
            'languagePrivilegesCollection',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER.update,
            ]);
        },
    },
    watch: {
        languagePrivilegesCollection: {
            deep: true,
            immediate: true,
            handler() {
                this.onFetchData();
            },
        },
    },
    methods: {
        ...mapActions('user', [
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onCellValueChange(cellValues) {
            const drafts = {
                ...this.drafts,
            };

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                if (columnId !== 'read' && value) {
                    drafts[`${rowId}/read`] = true;
                }

                if (columnId === 'read') {
                    drafts[`${rowId}/edit`] = false;
                }

                drafts[`${rowId}/${columnId}`] = value;
            });

            this.__setState({
                key: 'drafts',
                value: drafts,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'rolePrivileges',
                value: drafts,
            });
        },
        onFetchData() {
            const fullDataList = this.activeLanguages.map(({
                name,
                code,
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
                isEditable: this.isAllowedToUpdate,
            });
            const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
            const sortedColumns = getSortedColumnsByIDs(columns, config.split(','));

            this.columns = sortedColumns;
            this.rows = rows;
            this.filtered = fullDataList.length;
        },
    },
};
</script>

<style lang="scss" scoped>
    .language-privileges-footer {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
</style>
