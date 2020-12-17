/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <VerticalTabBarList>
        <SideBar
            :title="$t('attribute.list.searchHeader')"
            :items="groupedAttributesByLanguage"
            :expanded="expandedGroup"
            :searchable="true">
            <template #header>
                <ListSearchSelectHeader
                    v-if="isSelectLanguage"
                    :title="$t('attribute.list.searchHeader')"
                    @search="onSearch">
                    <template #select>
                        <LanguageTreeSelect
                            :value="languageCode"
                            @input="onSelectLanguage" />
                    </template>
                </ListSearchSelectHeader>
            </template>
            <template #body>
                <Preloader v-if="isPrefetchingData" />
            </template>
            <template #item="{ item, onExpand }">
                <AttributeSideBarGroupElement
                    v-if="item.rootId === null"
                    :group="item"
                    :is-prefetching-data="isPrefetchingGroupData[item.id]"
                    @click.native="onExpandGroup({ item, onExpand })" />
                <AttributeSideBarElement
                    v-else
                    :item="item"
                    :language-code="languageCode"
                    :is-draggable="!disabled" />
            </template>
        </SideBar>
        <CreateAttributeFab
            :floating="{ bottom: '16px', right: '16px' }"
            @added="onCreatedAttribute" />
    </VerticalTabBarList>
</template>

<script>
import CreateAttributeFab from '@Attributes/components/Buttons/CreateAttributeFab';
import AttributeSideBarElement from '@Attributes/components/SideBars/AttributeSideBarElement';
import AttributeSideBarGroupElement from '@Attributes/components/SideBars/AttributeSideBarGroupElement';
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
import {
    UNASSIGNED_GROUP_ID,
} from '@Core/defaults/list';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    getGroups,
    getItems,
} from '@Core/services/sidebar';
import ListSearchSelectHeader from '@UI/components/List/ListSearchSelectHeader';
import Preloader from '@UI/components/Preloader/Preloader';
import SideBar from '@UI/components/SideBar/SideBar';
import VerticalTabBarList from '@UI/components/TabBar/VerticalTabBarList';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'AttributesListTab',
    components: {
        AttributeSideBarGroupElement,
        CreateAttributeFab,
        VerticalTabBarList,
        SideBar,
        ListSearchSelectHeader,
        LanguageTreeSelect,
        Preloader,
        AttributeSideBarElement,
    },
    props: {
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    async fetch() {
        await this.fetchAttributesForLanguage({
            languageCode: this.defaultLanguageCode,
            limit: 0,
        });

        this.groupedAttributes = {
            ...this.groupedAttributes,
        };

        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            isPrefetchingGroupData: {},
            groupedAttributes: {},
            expandedGroup: {},
            languageCode: '',
            searchPhrase: '',
        };
    },
    computed: {
        ...mapState('core', [
            'defaultLanguageCode',
        ]),
        groupedAttributesByLanguage() {
            const groups = this.groupedAttributes[this.languageCode] || [];

            return groups.filter(item => item.itemsCount > 0);
        },
    },
    created() {
        this.languageCode = this.defaultLanguageCode;
    },
    beforeDestroy() {
        this.setDisabledElements({});
    },
    methods: {
        ...mapActions('list', [
            'setDisabledElements',
        ]),
        async onExpandGroup({
            item,
            onExpand,
        }) {
            onExpand(item);

            await this.getItemsForGroup(item.id);

            this.expandedGroup = {
                [item.id]: item.expanded,
            };
        },
        async getItemsForGroup(id) {
            const groupToExpand = this.groupedAttributesByLanguage.find(
                group => group.id === id,
            );

            if (groupToExpand.itemsCount !== groupToExpand.children.length) {
                this.isPrefetchingGroupData = {
                    ...this.isPrefetchingGroupData,
                    [id]: true,
                };

                const mappedGroupId = id === UNASSIGNED_GROUP_ID ? '' : id;
                const filter = `groups=${mappedGroupId}`;

                await getItems({
                    $axios: this.$axios,
                    languageCode: this.languageCode,
                    path: `${this.languageCode}/attributes`,
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
                        groupId: id,
                    }),
                });
            }
        },
        getGroupItemsSuccess({
            items,
            languageCode,
            groupId,
        }) {
            const groupIndex = this.groupedAttributes[languageCode].findIndex(
                group => group.id === groupId,
            );

            this.groupedAttributes[languageCode][groupIndex].children = items;
            this.groupedAttributes = {
                ...this.groupedAttributes,
            };

            this.isPrefetchingGroupData = {
                ...this.isPrefetchingGroupData,
                [groupId]: false,
            };
        },
        async fetchAttributesForLanguage({
            languageCode,
            limit = 99999,
        }) {
            await Promise.all([
                getGroups({
                    $axios: this.$axios,
                    path: `${languageCode}/attributes/groups`,
                    languageCode,
                    onSuccess: this.onFetchGroupsSuccess,
                }),
                getItems({
                    $axios: this.$axios,
                    path: `${languageCode}/attributes`,
                    languageCode,
                    params: {
                        limit,
                        offset: 0,
                        view: 'list',
                        filter: 'groups=',
                        field: 'code',
                        order: 'ASC',
                    },
                    onSuccess: this.onFetchUnassignedGroupItemsSuccess,
                }),
            ]);
        },
        onFetchGroupsSuccess({
            groups,
            languageCode,
        }) {
            this.groupedAttributes[languageCode] = groups;

            this.addUnassignedGroup(languageCode);
        },
        onFetchUnassignedGroupItemsSuccess({
            items,
            info,
            languageCode,
        }) {
            this.addUnassignedGroup(languageCode);

            const unassignedGroupIndex = this.groupedAttributes[languageCode].findIndex(
                group => group.id === UNASSIGNED_GROUP_ID,
            );

            this.groupedAttributes[languageCode][unassignedGroupIndex].children = items;
            this.groupedAttributes[languageCode][unassignedGroupIndex].itemsCount = info.filtered;
        },
        addUnassignedGroup(languageCode) {
            const isUnassignedGroup = this.groupedAttributes[languageCode].some(
                group => group.id === UNASSIGNED_GROUP_ID,
            );

            if (!isUnassignedGroup) {
                this.groupedAttributes[languageCode].push({
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: 'Not Assigned',
                    hint: '',
                    itemsCount: 0,
                    children: [],
                });
            }
        },
        onCreatedAttribute() {
            this.fetchAttributesForLanguage({
                languageCode: this.languageCode,
            });
        },
        async onSearch(value) {
            this.searchPhrase = value;

            const params = {
                limit: 99999,
                offset: 0,
                view: 'list',
                field: 'code',
                order: 'ASC',
            };

            if (this.searchPhrase !== '') {
                params.filter = `code=${this.searchPhrase}`;
            }

            await getItems({
                $axios: this.$axios,
                path: `${this.languageCode}/attributes`,
                languageCode: this.languageCode,
                params,
                onSuccess: this.getAllGroupsItemsSuccess,
            });
        },
        getAllGroupsItemsSuccess({
            items,
            languageCode,
        }) {
            this.groupedAttributes[languageCode].forEach((group, index) => {
                let children = [];

                if (group.id === UNASSIGNED_GROUP_ID) {
                    children = items.filter(({
                        groups,
                    }) => groups.length === 0);
                } else {
                    children = items.filter(({
                        groups,
                    }) => groups.some(id => id === group.id));
                }

                this.groupedAttributes[languageCode][index].children = children;
                this.groupedAttributes[languageCode][index].itemsCount = children.length;
            });

            this.groupedAttributes = {
                ...this.groupedAttributes,
            };
        },
        async onSelectLanguage(value) {
            if (typeof this.groupedAttributes[value] === 'undefined') {
                this.isPrefetchingData = true;

                await this.fetchAttributesForLanguage({
                    languageCode: value,
                    limit: 0,
                });
            }

            const [
                groupId,
            ] = Object.keys(this.expandedGroup);

            this.languageCode = value;

            if (groupId && this.expandedGroup[groupId]) {
                await this.getItemsForGroup(groupId);
            }

            this.groupedAttributes = {
                ...this.groupedAttributes,
            };

            this.isPrefetchingData = false;
        },
    },
};
</script>
