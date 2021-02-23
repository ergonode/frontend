/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :columns="gridData.columns"
        :rows="gridData.rows"
        :drafts="drafts"
        :errors="errors"
        :data-count="gridData.filtered"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-border="true"
        @cell-value="onCellValueChange"
        v-bind="extendedProps['grid']">
        <template #footer>
            <div class="role-privileges-footer">
                <UpdateRolePrivilegesButton
                    :scope="scope"
                    :errors="errors"
                    :change-values="changeValues" />
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
import Grid from '@UI/components/Grid/Grid';
import UpdateRolePrivilegesButton from '@Users/components/Buttons/UpdateRolePrivilegesButton';
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
    name: 'RolePrivilegesGrid',
    components: {
        Grid,
        UpdateRolePrivilegesButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Users/components/Grids/RolePrivilegesGrid/props',
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
    computed: {
        ...mapState('dictionaries', {
            privilegesDictionary: state => state.privileges,
        }),
        ...mapState('role', [
            'privileges',
        ]),
        gridData() {
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

            return {
                columns: getSortedColumnsByIDs(columns, config.split(',')),
                filtered: this.privilegesDictionary.length,
                rows,
            };
        },
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

                if (columnId === 'read') {
                    drafts[`${rowId}/create`] = false;
                    drafts[`${rowId}/update`] = false;
                    drafts[`${rowId}/delete`] = false;
                }

                drafts[`${rowId}/${columnId}`] = value;
            });

            this.setDrafts({
                ...this.drafts,
                ...drafts,
            });
            this.__setState({
                key: 'drafts',
                value: this.drafts,
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
