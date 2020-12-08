/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    UNASSIGNED_GROUP_ID,
} from '@Core/defaults/list';
import {
    getMappedGroupItemsCount,
} from '@Core/models/mappers/listMapper';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    getListGroups,
    getListItems,
} from '@Core/services/list/getList.service';

export default function ({
    namespace,
}) {
    return {
        data() {
            return {
                groups: {},
                groupItemsCount: {},
                items: {},
                codeFilter: '',
                expandedGroupId: '',
                prefetchingGroupItemsId: '',
                isPrefetchingData: true,
            };
        },
        async fetch() {
            try {
                const {
                    defaultLanguageCode: languageCode,
                } = this.$store.state.core;

                await this.fetchListData({
                    languageCode,
                    limit: 0,
                });

                this.isPrefetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'List hasn’t been fetched properly',
                });

                this.isPrefetchingData = false;
            }
        },
        computed: {
            unassignedGroup() {
                return {
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: 'Not Assigned',
                    hint: '',
                };
            },
        },
        methods: {
            async fetchListData({
                languageCode,
                limit = 99999,
            }) {
                await Promise.all([
                    getListGroups({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}/groups`,
                        languageCode,
                        onSuccess: payload => this.onFetchListGroupsSuccess({
                            ...payload,
                            languageCode,
                        }),
                    }),
                    getListItems({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}`,
                        params: {
                            limit,
                            offset: 0,
                            view: 'list',
                            filter: 'groups=',
                            field: 'code',
                            order: 'ASC',
                        },
                        onSuccess: payload => this.onFetchListItemsSuccess({
                            ...payload,
                            languageCode,
                        }),
                    }),
                ]);
            },
            onFetchListGroupsSuccess({
                groups,
                items,
                groupItemsCount,
                languageCode,
            }) {
                if (typeof this.items[languageCode] === 'undefined') {
                    this.items[languageCode] = {};
                }

                this.groups[languageCode] = [
                    ...groups,
                ];

                this.groups[languageCode].push({
                    ...this.unassignedGroup,
                });

                this.items[languageCode] = items;

                this.groupItemsCount = groupItemsCount;
            },
            onFetchListItemsSuccess({
                items,
                info,
                languageCode,
            }) {
                if (typeof this.items[languageCode] === 'undefined') {
                    this.items[languageCode] = {};
                }

                this.items[languageCode][UNASSIGNED_GROUP_ID] = items;
                this.groupItemsCount = {
                    ...this.groupItemsCount,
                    [UNASSIGNED_GROUP_ID]: info.filtered,
                };
            },
            async getGroupItems({
                groupId,
                languageCode,
            }) {
                const {
                    length: currentItemsCount,
                } = this.items[languageCode][groupId];

                if (currentItemsCount !== this.groupItemsCount[groupId]) {
                    const mappedGroupId = groupId === UNASSIGNED_GROUP_ID ? '' : groupId;
                    const filter = this.codeFilter
                        ? `groups=${mappedGroupId};code=${this.codeFilter}`
                        : `groups=${mappedGroupId}`;

                    this.prefetchingGroupItemsId = this.expandedGroupId;

                    await getListItems({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}`,
                        params: {
                            limit: 99999,
                            offset: 0,
                            filter,
                            view: 'list',
                            field: 'code',
                            order: 'ASC',
                        },
                        onSuccess: payload => this.getGroupItemsSuccess({
                            ...payload,
                            languageCode,
                            groupId,
                        }),
                    });
                }
            },
            getGroupItemsSuccess({
                items,
                languageCode,
                groupId,
            }) {
                this.items[languageCode] = {
                    ...this.items[languageCode],
                    [groupId]: items,
                };

                this.prefetchingGroupItemsId = '';
            },
            async getAllGroupsItems({
                languageCode,
            }) {
                const filter = this.codeFilter ? `code=${this.codeFilter}` : '';

                await getListItems({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}`,
                    params: {
                        limit: 99999,
                        offset: 0,
                        filter,
                        view: 'list',
                        field: 'code',
                        order: 'ASC',
                    },
                    onSuccess: payload => this.getAllGroupsItemsSuccess({
                        ...payload,
                        languageCode,
                    }),
                });
            },
            getAllGroupsItemsSuccess({
                items,
                languageCode,
            }) {
                if (this.expandedGroupId !== '') {
                    const isAnyGroupInsideGroups = groups => groups.some(
                        grp => grp === this.expandedGroupId,
                    );
                    const isGroupUnassigned = this.expandedGroupId === UNASSIGNED_GROUP_ID;
                    const groupItems = items.filter(({
                        groups,
                    }) => (groups.length === 0 && isGroupUnassigned)
                        || isAnyGroupInsideGroups(groups));

                    this.items[languageCode] = {
                        ...this.items[languageCode],
                        [this.expandedGroupId]: groupItems,
                    };
                }

                this.groupItemsCount = getMappedGroupItemsCount(items);
            },
            async onGroupExpand({
                group,
                languageCode,
                isExpanded,
            }) {
                this.expandedGroupId = isExpanded ? group.id : '';

                if (isExpanded) {
                    await this.getGroupItems({
                        groupId: group.id,
                        languageCode,
                    });
                }
            },
        },
    };
}
