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
        :is-prefetching-data="isFetchingData"
        :is-editable="isAllowedToUpdate"
        :is-border="true"
        @cell-value="onCellValueChange"
        v-bind="extendedProps['grid']">
        <template #footer>
            <div class="role-privileges-footer">
                <UpdateRolePrivilegesButton
                    :scope="scope"
                    :errors="errors"
                    :change-values="changeValues"
                    @updated="onUpdatedRolePrivileges" />
            </div>
        </template>
    </Grid>
</template>

<script>
import extendPropsMixin from '@Core/mixins/extend/extendProps';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import UpdateRolePrivilegesButton from '@Roles/components/Buttons/UpdateRolePrivilegesButton';
import PRIVILEGES from '@Roles/config/privileges';
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
    name: 'RolePrivilegesGrid',
    components: {
        Grid,
        UpdateRolePrivilegesButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Roles/components/Grids/RolePrivilegesGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
        gridDraftMixin,
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
        changeValues: {
            type: Object,
            default: () => ({}),
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
            fullDataList: this.privilegesDictionary,
            selectedData: this.privileges,
            defaults: privilegesDefaults,
            isEditable: this.isAllowedToUpdate,
        });
        const config = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`) || '';

        this.columns = getSortedColumnsByIDs(columns, config.split(','));
        this.filtered = this.privilegesDictionary.length;
        this.rows = rows;

        this.isFetchingData = false;
    },
    data() {
        return {
            columns: [],
            rows: [],
            filtered: 0,
            isFetchingData: true,
        };
    },
    computed: {
        ...mapState('dictionaries', {
            privilegesDictionary: state => state.privileges,
        }),
        ...mapState('role', [
            'privileges',
        ]),
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.USER_ROLE.update,
            ]);
        },
    },
    methods: {
        ...mapActions('role', [
            '__setState',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        ...mapActions('dictionaries', [
            'getInitialDictionaries',
        ]),
        onUpdatedRolePrivileges() {
            this.setDrafts({});
        },
        onCellValueChange(cellValues) {
            const drafts = {};

            cellValues.forEach(({
                rowId,
                columnId,
                value,
            }) => {
                if (columnId !== 'read' && value) {
                    drafts[`${rowId}/read`] = true;
                }

                switch (columnId) {
                case 'read':
                    drafts[`${rowId}/create`] = false;
                    drafts[`${rowId}/update`] = false;
                    drafts[`${rowId}/delete`] = false;
                    break;
                case 'create':
                    drafts[`${rowId}/update`] = value;
                    break;
                default: break;
                }

                drafts[`${rowId}/${columnId}`] = value;
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });
            this.onScopeValueChange({
                scope: this.scope,
                fieldKey: 'rolePrivileges',
                value: this.drafts,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .role-privileges-footer {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
</style>
