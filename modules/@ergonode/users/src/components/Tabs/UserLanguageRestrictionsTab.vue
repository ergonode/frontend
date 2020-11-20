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
                :extended-columns="extendedColumns"
                :extended-data-cells="extendedDataCells"
                :extended-data-filter-cells="extendedDataFilterCells"
                :extended-data-edit-cells="extendedDataEditCells"
                :extended-edit-filter-cells="extendedDataEditFilterCells"
                :is-editable="isAllowedToUpdate"
                :is-border="true"
                @cell-value="onCellValueChange">
                <template #footer>
                    <div class="language-privileges-footer">
                        <Button
                            :title="$t('core.buttons.submit')"
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import extendedGridComponentsMixin from '@Core/mixins/grid/extendedGridComponentsMixin';
import gridDraftMixin from '@Core/mixins/grid/gridDraftMixin';
import tabFeedbackMixin from '@Core/mixins/tab/tabFeedbackMixin';
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import Button from '@UI/components/Button/Button';
import Grid from '@UI/components/Grid/Grid';
import IconSpinner from '@UI/components/Icons/Feedback/IconSpinner';
import CenterViewTemplate from '@UI/components/Layout/Templates/CenterViewTemplate';
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
    name: 'UserLanguageRestrictionsTab',
    components: {
        Button,
        IconSpinner,
        CenterViewTemplate,
        Grid,
    },
    mixins: [
        gridDraftMixin,
        extendedGridComponentsMixin,
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
        ...mapGetters('core', [
            'activeLanguages',
        ]),
        ...mapState('user', [
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
                this.getGridData();
            },
        },
    },
    methods: {
        ...mapActions('user', [
            'updateUser',
            '__setState',
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
            this.updateUser({
                scope: this.scope,
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Language privileges have been updated',
            });

            this.setDrafts();
            this.__setState({
                key: 'drafts',
                value: {},
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
                    drafts[`${rowId}/edit`] = false;
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
        getGridData() {
            const fullDataList = this.activeLanguages.map(({
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
                isEditable: this.isAllowedToUpdate,
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

<style lang="scss" scoped>
    .language-privileges-footer {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-items: center;
    }
</style>
