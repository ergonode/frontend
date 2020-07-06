/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
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
            };
        },
        async fetch() {
            const {
                defaultLanguageCodeByPrivileges,
            } = this.$store.state.core;

            await this.fetchListData(defaultLanguageCodeByPrivileges);

            this.expandedGroupId = UNASSIGNED_GROUP_ID;
        },
        methods: {
            async fetchListData(languegCode) {
                const unassignedGroup = {
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: 'Not Assigned',
                    hint: '',
                };

                const [
                    groupItems,
                    listItems,
                ] = await Promise.all([
                    getListGroups({
                        $axios: this.$axios,
                        path: `${languegCode}/${namespace}/groups`,
                        languageCode: languegCode,
                    }),
                    getListItems({
                        $axios: this.$axios,
                        path: `${languegCode}/${namespace}`,
                        params: {
                            limit: 9999,
                            offset: 0,
                            view: 'list',
                            filter: 'groups=',
                            field: 'code',
                            order: 'ASC',
                        },
                    }),
                ]);

                this.groups[languegCode] = [
                    ...groupItems.groups,
                    unassignedGroup,
                ];
                this.items[languegCode] = {
                    ...groupItems.items,
                    [UNASSIGNED_GROUP_ID]: listItems.items,
                };
                this.groupItemsCount = {
                    ...groupItems.groupItemsCount,
                    [UNASSIGNED_GROUP_ID]: listItems.items.length,
                };

                this.groups = {
                    ...this.groups,
                };
                this.items = {
                    ...this.items,
                };
                this.groupItemsCount = {
                    ...this.groupItemsCount,
                };
            },
            getGroups(languageCode) {
                return getListGroups({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}/groups`,
                    languageCode,
                }).then(({
                    groups, items, groupItemsCount,
                }) => {
                    this.groups = {
                        ...this.groups,
                        [languageCode]: groups,
                    };
                    this.items = {
                        ...this.items,
                        [languageCode]: items,
                    };
                    this.groupItemsCount = groupItemsCount;
                });
            },
            async getUnassignedGroupItems(languageCode) {
                const unassignedGroup = {
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: 'Not Assigned',
                    hint: '',
                };
                this.groups[languageCode].push(unassignedGroup);
                this.items[languageCode][UNASSIGNED_GROUP_ID] = [];

                await this.getGroupItems({
                    groupId: UNASSIGNED_GROUP_ID,
                    languageCode,
                });

                this.groupItemsCount = {
                    ...this.groupItemsCount,
                    [UNASSIGNED_GROUP_ID]: this.items[languageCode][UNASSIGNED_GROUP_ID].length,
                };
            },
            getGroupItems({
                groupId, languageCode,
            }) {
                const {
                    length: currentItemsCount,
                } = this.items[languageCode][groupId];

                if (currentItemsCount !== this.groupItemsCount[groupId]) {
                    const filter = this.codeFilter
                        ? `groups=${groupId || ''};code=${this.codeFilter}`
                        : `groups=${groupId || ''}`;

                    return getListItems({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}`,
                        params: {
                            limit: 9999,
                            offset: 0,
                            filter,
                            view: 'list',
                            field: 'code',
                            order: 'ASC',
                        },
                    }).then(({
                        items,
                    }) => {
                        this.items[languageCode] = {
                            ...this.items[languageCode],
                            [groupId]: items,
                        };
                    });
                }

                return null;
            },
            getAllGroupsItems({
                languageCode,
            }) {
                const filter = this.codeFilter ? `code=${this.codeFilter}` : '';

                return getListItems({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}`,
                    params: {
                        limit: 9999,
                        offset: 0,
                        filter,
                        view: 'list',
                        field: 'code',
                        order: 'ASC',
                    },
                }).then(({
                    items,
                }) => {
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
                });
            },
            onGroupExpand({
                group, languageCode, isExpanded,
            }) {
                if (isExpanded) {
                    this.getGroupItems({
                        groupId: group.id,
                        languageCode,
                    });
                }

                this.expandedGroupId = isExpanded ? group.id : '';
            },
        },
    };
}
