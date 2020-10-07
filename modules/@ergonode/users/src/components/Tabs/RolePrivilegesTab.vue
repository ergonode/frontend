/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <CenterViewTemplate>
        <template #content>
            <Grid
                :columns="columns"
                :rows="rows"
                :drafts="drafts"
                :data-count="dataCount"
                :is-editable="isAllowedToUpdate"
                :is-border="true"
                @cell-value="onCellValueChange">
                <template #footer>
                    <div class="role-privileges-footer">
                        <Button
                            title="SAVE CHANGES"
                            @click.native="onSubmit">
                            <template
                                v-if="isSubmitting"
                                #prepend="{ color }">
                                <IconSpinner :fill-color="color" />
                            </template>
                        </Button>
                    </div>
                </template>
            </Grid>
        </template>
    </CenterViewTemplate>
</template>

<script>
import Button from '@Core/components/Button/Button';
import Grid from '@Core/components/Grid/Grid';
import IconSpinner from '@Core/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@Core/components/Layout/Templates/CenterViewTemplate';
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
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
        Button,
        IconSpinner,
        CenterViewTemplate,
        Grid,
    },
    mixins: [
        gridDraftMixin,
        tabFeedbackMixin,
    ],
    data() {
        return {
            columns: [],
            rows: {},
            dataCount: 0,
            isSubmitting: false,
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
        ...mapActions('role', [
            '__setState',
            'updateRole',
        ]),
        ...mapActions('feedback', [
            'onScopeValueChange',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeScopeErrors(this.scope);
            this.updateRole({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Role privileges have been updated',
            });

            this.isSubmitting = false;

            this.markChangeValuesAsSaved(this.scope);
        },
        onUpdateError(errors) {
            this.onError(errors);

            this.isSubmitting = false;
        },
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
        updateGridData() {
            const {
                rows, columns,
            } = getMappedGridData({
                fullDataList: this.privilegesDictionary,
                selectedData: this.privileges,
                defaults: privilegesDefaults,
                isEditable: this.isAllowedToUpdate,
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

<style lang="scss" scoped>
    .role-privileges-footer {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
</style>
