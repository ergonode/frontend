/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :scope="scope"
        :columns="columns"
        :rows="rows"
        :drafts="drafts"
        :errors="errors"
        :data-count="filtered"
        :extended-components="extendedGridComponents"
        :is-editable="isAllowedToUpdate"
        :is-border="true"
        @cell-value="onCellValueChange"
        v-bind="extendedProps['grid']">
        <template #actionsHeader="actionsHeaderProps">
            <Component
                v-for="(headerItem, index) in extendedActionHeader"
                :is="headerItem.component"
                :key="index"
                v-bind="bindingProps({
                    props: {
                        ...actionsHeaderProps,
                        ...headerItem.props,
                    },
                })" />
        </template>
        <template #footer>
            <Component
                v-for="(footerItem, index) in extendedFooter"
                :is="footerItem.component"
                :key="index"
                v-bind="bindingProps(footerItem)" />
            <div class="language-privileges-footer">
                <UpdateLanguageRestrictionsButton
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
import {
    getFilterQueryParams,
    getSortedColumnsByIDs,
} from '@Core/models/mappers/gridDataMapper';
import UpdateLanguageRestrictionsButton from '@Users/components/Buttons/UpdateLanguageRestrictionsButton';
import PRIVILEGES from '@Users/config/privileges';
import privilegeDefaults from '@Users/defaults/languages';
import {
    getMappedGridData,
    getMappedRestrictions,
} from '@Users/models/gridDataMapper';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'UserLanguageRestrictionsGrid',
    components: {
        UpdateLanguageRestrictionsButton,
    },
    mixins: [
        extendPropsMixin({
            extendedKey: '@Users/components/Grids/UserLanguageRestrictionsGrid/props',
            extendedNames: [
                'grid',
            ],
        }),
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
    data() {
        return {
            rows: [],
            columns: [],
            filtered: 0,
        };
    },
    computed: {
        ...mapState('core', [
            'inheritedLanguagesTree',
        ]),
        ...mapState('user', [
            'drafts',
            'languagePrivilegesCollection',
        ]),
        extendedActionHeader() {
            return this.$getExtendSlot('@Users/components/Grids/UserLanguageRestrictionsGrid/actionHeader');
        },
        extendedFooter() {
            return this.$getExtendSlot('@Users/components/Grids/UserLanguageRestrictionsGrid/footer');
        },
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
            const fullDataList = this.inheritedLanguagesTree.map(({
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

            this.columns = getSortedColumnsByIDs(columns, this.$gridCookies.get().split(','));
            this.rows = rows;
            this.filtered = fullDataList.length;
        },
        bindingProps({
            props = {},
        }) {
            const query = getFilterQueryParams(this.$route.query);

            return {
                disabled: !this.isAllowedToUpdate,
                query: query.replace(/\[|\]/g, ''),
                ...props,
            };
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
