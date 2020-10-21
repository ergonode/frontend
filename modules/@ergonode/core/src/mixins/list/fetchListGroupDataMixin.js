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
                defaultLanguageCode: languageCode,
            } = this.$store.state.core;

            await this.fetchListData({
                languageCode,
                limit: 0,
            });
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
                const [
                    groupItems,
                    listItems,
                ] = await Promise.all([
                    getListGroups({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}/groups`,
                        languageCode,
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
                    }),
                ]);

                this.groups = {
                    ...this.groups,
                    [languageCode]: [
                        ...groupItems.groups,
                        this.unassignedGroup,
                    ],
                };

                this.items = {
                    ...this.items,
                    [languageCode]: {
                        ...groupItems.items,
                        [UNASSIGNED_GROUP_ID]: listItems.items,
                    },
                };

                this.groupItemsCount = {
                    ...groupItems.groupItemsCount,
                    [UNASSIGNED_GROUP_ID]: listItems.info.filtered,
                };
            },
            async getGroups(languageCode) {
                const {
                    groups,
                    items,
                    groupItemsCount,
                } = await getListGroups({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}/groups`,
                    languageCode,
                });

                this.groups = {
                    ...this.groups,
                    [languageCode]: groups,
                };
                this.items = {
                    ...this.items,
                    [languageCode]: items,
                };
                this.groupItemsCount = groupItemsCount;
            },
            async getUnassignedGroupItems(languageCode) {
                this.groups[languageCode].push(this.unassignedGroup);
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
            async getGroupItems({
                groupId,
                languageCode,
            }) {
                const {
                    length: currentItemsCount,
                } = this.items[languageCode][groupId];

                if (currentItemsCount !== this.groupItemsCount[groupId]) {
                    const filter = this.codeFilter
                        ? `groups=${groupId || ''};code=${this.codeFilter}`
                        : `groups=${groupId || ''}`;

                    const {
                        items,
                    } = await getListItems({
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
                    });

                    this.items[languageCode] = {
                        ...this.items[languageCode],
                        [groupId]: items,
                    };
                }
            },
            async getAllGroupsItems({
                languageCode,
            }) {
                const filter = this.codeFilter ? `code=${this.codeFilter}` : '';

                const {
                    items,
                } = await getListItems({
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
                });

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
                if (isExpanded) {
                    await this.getGroupItems({
                        groupId: group.id,
                        languageCode,
                    });
                }

                this.expandedGroupId = isExpanded ? group.id : '';
            },
        },
    };
}
