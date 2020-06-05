/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { getListGroups, getListItems } from '@Core/services/list/getList.service';
import { UNASSIGNED_GROUP_ID } from '@Core/defaults/list';
import { getMappedGroupItemsCount } from '@Core/models/mappers/listMapper';
import { getUUID } from '@Core/models/stringWrapper';

export default function ({ namespace }) {
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
        async created() {
            const { defaultLanguageCodeByPrivileges } = this.$store.state.core;

            await this.getGroups(defaultLanguageCodeByPrivileges);
            await this.getUnassignedGroupItems(defaultLanguageCodeByPrivileges);
            this.expandedGroupId = UNASSIGNED_GROUP_ID;
        },
        methods: {
            getGroups(languageCode) {
                return getListGroups({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}/groups`,
                    languageCode,
                }).then(({ groups, items, groupItemsCount }) => {
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
            getGroupItems({ groupId, languageCode }) {
                const { length: currentItemsCount } = this.items[languageCode][groupId];

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
                    }).then(({ items }) => {
                        this.items[languageCode] = {
                            ...this.items[languageCode],
                            [groupId]: items,
                        };
                    });
                }

                return null;
            },
            getAllGroupsItems({ languageCode }) {
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
                }).then(({ items }) => {
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
            getGroupsAndExpandedGroupItems({ languageCode }) {
                return this.getGroups(languageCode).then(() => {
                    const requests = [
                        this.getUnassignedGroupItems(languageCode),
                    ];

                    if (this.expandedGroupId) {
                        const {
                            id: groupId,
                        } = this.groups[languageCode].find(({ id }) => id === this.expandedGroupId);

                        requests.push(
                            this.getGroupItems({
                                groupId,
                                languageCode,
                            }),
                        );
                    }

                    return Promise.all(requests);
                });
            },
            onGroupExpand({ group, languageCode, isExpanded }) {
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
