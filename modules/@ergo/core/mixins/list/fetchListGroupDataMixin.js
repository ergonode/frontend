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
                groups: [],
                groupItemsCounts: {},
                items: {},
                codeFilter: '',
                expandedGroupId: '',
            };
        },
        async created() {
            const { language: languageCode } = this.$store.state.authentication.user;
            await this.getGroups(languageCode);
            await this.getUnassignedGroupItems(languageCode);
            this.expandedGroupId = UNASSIGNED_GROUP_ID;
        },
        computed: {
            groupsWithItems() {
                return this.groups.filter(({ id }) => this.groupItemsCounts[id]);
            },
        },
        methods: {
            getGroups(languageCode) {
                return getListGroups({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}/groups`,
                    languageCode,
                }).then(({ groups, items, groupItemsCounts }) => {
                    this.groups = groups;
                    this.items = items;
                    this.groupItemsCounts = groupItemsCounts;
                });
            },
            async getUnassignedGroupItems(languageCode) {
                const unassignedGroup = {
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: 'Not Assigned',
                    hint: '',
                };
                this.groups.push(unassignedGroup);
                this.items[UNASSIGNED_GROUP_ID] = { [languageCode]: [] };

                await this.getGroupItems({
                    group: unassignedGroup,
                    languageCode,
                });

                this.groupItemsCounts = {
                    ...this.groupItemsCounts,
                    [UNASSIGNED_GROUP_ID]: this.items[UNASSIGNED_GROUP_ID][languageCode].length,
                };
            },
            getGroupItems({ group, languageCode }) {
                const { length: currentItemsCount } = this.items[group.id][languageCode];

                if (typeof this.groupItemsCounts[group.id] === 'undefined'
                    || currentItemsCount !== this.groupItemsCounts[group.id]) {
                    const filter = this.codeFilter
                        ? `groups=${group.id ? group.id : ''};code=${this.codeFilter}`
                        : `groups=${group.id ? group.id : ''}`;

                    return getListItems({
                        $axios: this.$axios,
                        path: `${languageCode}/${namespace}`,
                        params: {
                            limit: 9999,
                            offset: 0,
                            filter,
                            field: 'code',
                            order: 'ASC',
                        },
                    }).then(({ items }) => {
                        this.items[group.id] = { [languageCode]: items };
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

                        this.items[this.expandedGroupId] = { [languageCode]: groupItems };
                    }

                    this.groupItemsCounts = getMappedGroupItemsCount(items);
                });
            },
            async getGroupsAndExpandedGroupItems({ languageCode }) {
                const requests = [
                    this.getGroups(languageCode),
                ];

                if (this.expandedGroupId) {
                    requests.push(
                        this.getGroupItems({
                            group: this.groups.find(({ id }) => id === this.expandedGroupId),
                            languageCode,
                        }),
                    );
                }

                await Promise.all(requests);
                await this.getUnassignedGroupItems(languageCode);
            },
            onGroupExpand({ group, languageCode, isExpanded }) {
                if (isExpanded) {
                    this.getGroupItems({
                        group,
                        languageCode,
                    });
                }

                this.expandedGroupId = isExpanded ? group.id : '';
            },
        },
    };
}
