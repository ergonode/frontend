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
                @cellValue="onCellValueChange">
                <template #footer>
                    <div class="language-privileges-footer">
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
import {
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
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
        ...mapState('user', {
            languagePrivilegesCollection: state => state.languagePrivilegesCollection,
        }),
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
        ...mapActions('validations', [
            'onError',
            'removeErrors',
        ]),
        onSubmit() {
            if (this.isSubmitting) {
                return;
            }
            this.isSubmitting = true;

            this.removeErrors();
            this.updateUser({
                onSuccess: this.onUpdateSuccess,
                onError: this.onUpdateError,
            });
        },
        onUpdateSuccess() {
            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Language privileges updated',
            });

            this.setDrafts();
            this.__setState({
                key: 'drafts',
                value: {},
            });

            this.isSubmitting = false;
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
