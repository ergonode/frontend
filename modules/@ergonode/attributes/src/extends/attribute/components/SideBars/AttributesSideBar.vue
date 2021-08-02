/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Attributes.attribute._.title')"
        :items="groupedAttributesByLanguage"
        :expanded="expandedGroup"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #header>
            <ListSearchSelectHeader
                v-if="isSelectLanguage"
                :title="$t('@Attributes.attribute._.title')"
                :search-value="searchValue"
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
        <template #noDataPlaceholder>
            <SideBarNoDataPlaceholder
                :title="$t('@Attributes.attribute._.noAttributes')"
                :subtitle="$t('@Attributes.attribute._.createFirst')">
                <template #action>
                    <CreateAttributeButton />
                </template>
            </SideBarNoDataPlaceholder>
        </template>
        <template #item="{ item, onExpand }">
            <AttributeSideBarGroupElement
                v-if="item.rootId === null"
                :group="item"
                :dragging-element-type="draggingElementType"
                :is-prefetching-data="isPrefetchingGroupData[item.id]"
                @click.native="onExpandGroup({ item, onExpand })" />
            <AttributeSideBarElement
                v-else
                :scope="scope"
                :item="item"
                :language-code="languageCode"
                :dragging-element-type="draggingElementType"
                :disabled="disabled" />
        </template>
    </SideBar>
</template>

<script>
import CreateAttributeButton from '@Attributes/components/Buttons/CreateAttributeButton';
import {
    ATTRIBUTE_CREATED_EVENT_NAME,
} from '@Attributes/defaults';
import AttributeSideBarElement from '@Attributes/extends/attribute/components/SideBars/AttributeSideBarElement';
import AttributeSideBarGroupElement from '@Attributes/extends/attribute/components/SideBars/AttributeSideBarGroupElement';
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    UNASSIGNED_GROUP_ID,
} from '@Core/defaults/list';
import {
    deepClone,
} from '@Core/models/objectWrapper';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import {
    getGroups,
    getItems,
} from '@Core/services/sidebar';
import debounce from 'debounce';
import {
    mapActions,
    mapGetters,
} from 'vuex';

export default {
    name: 'AttributesSideBar',
    components: {
        CreateAttributeButton,
        AttributeSideBarGroupElement,
        LanguageTreeSelect,
        AttributeSideBarElement,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        isSelectLanguage: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
    async fetch() {
        await this.getAttributesForLanguage({
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
            groupedAttributesBeforeSearch: {},
            expandedGroup: {},
            languageCode: '',
            searchValue: '',
            onDebounceGetItems: null,
        };
    },
    computed: {
        ...mapGetters('core', [
            'defaultLanguageCode',
        ]),
        groupedAttributesByLanguage() {
            const groups = this.groupedAttributes[this.languageCode] || [];

            return groups.filter(item => item.itemsCount > 0);
        },
    },
    created() {
        this.languageCode = this.defaultLanguageCode;

        this.onDebounceGetItems = debounce(this.getAllGroupsItems, 500);
    },
    mounted() {
        document.documentElement.addEventListener(
            ATTRIBUTE_CREATED_EVENT_NAME,
            this.onAttributeCreated,
        );
    },
    beforeDestroy() {
        this.removeDisabledScopeElements(this.scope);

        document.documentElement.removeEventListener(
            ATTRIBUTE_CREATED_EVENT_NAME,
            this.onAttributeCreated,
        );
    },
    methods: {
        ...mapActions('list', [
            'removeDisabledScopeElements',
        ]),
        async onAttributeCreated() {
            await this.getAttributesForLanguage({
                languageCode: this.languageCode,
            });

            const [
                groupId,
            ] = Object.keys(this.expandedGroup);

            if (groupId && this.expandedGroup[groupId]) {
                await this.getItemsForGroup(groupId);
            }

            this.groupedAttributes = {
                ...this.groupedAttributes,
            };
        },
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
        async getAttributesForLanguage({
            languageCode,
            limit = 99999,
        }) {
            this.addUnassignedGroup(languageCode);

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
            groups.forEach((group) => {
                const addedGroupIndex = this.groupedAttributes[languageCode].findIndex(({
                    id,
                }) => id === group.id);

                if (addedGroupIndex === -1) {
                    this.groupedAttributes[languageCode].push(group);
                } else {
                    this.groupedAttributes[languageCode][addedGroupIndex] = group;
                }
            });

            this.groupedAttributes = {
                ...this.groupedAttributes,
                [languageCode]: [
                    ...this.groupedAttributes[languageCode],
                ],
            };
        },
        onFetchUnassignedGroupItemsSuccess({
            items,
            info,
            languageCode,
        }) {
            const unassignedGroupIndex = this.groupedAttributes[languageCode].findIndex(
                group => group.id === UNASSIGNED_GROUP_ID,
            );

            this.groupedAttributes[languageCode][unassignedGroupIndex].children = items;
            this.groupedAttributes[languageCode][unassignedGroupIndex].itemsCount = info.filtered;
        },
        addUnassignedGroup(languageCode) {
            if (typeof this.groupedAttributes[languageCode] === 'undefined') {
                this.groupedAttributes[languageCode] = [];
            }

            const isUnassignedGroup = this.groupedAttributes[languageCode].some(
                group => group.id === UNASSIGNED_GROUP_ID,
            );

            if (!isUnassignedGroup) {
                this.groupedAttributes[languageCode].push({
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: this.$t('@Attributes._.notAssigned'),
                    hint: '',
                    itemsCount: 0,
                    children: [],
                });
            }
        },
        async onSearch(value) {
            if (this.searchValue === '') {
                this.groupedAttributesBeforeSearch = deepClone(this.groupedAttributes);
            }

            this.searchValue = value;

            if (value !== '') {
                this.onDebounceGetItems();
            } else {
                this.groupedAttributes = deepClone(this.groupedAttributesBeforeSearch);
                this.groupedAttributesBeforeSearch = {};
            }
        },
        async getAllGroupsItems() {
            const params = {
                limit: 99999,
                offset: 0,
                view: 'list',
                field: 'code',
                order: 'ASC',
            };

            if (this.searchValue !== '') {
                params.filter = `code=${this.searchValue}`;
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

                this.groupedAttributes[languageCode][index] = {
                    ...this.groupedAttributes[languageCode][index],
                    children,
                    itemsCount: children.length,
                };
            });

            this.groupedAttributes = {
                ...this.groupedAttributes,
            };
        },
        async onSelectLanguage(value) {
            if (typeof this.groupedAttributes[value] === 'undefined') {
                this.isPrefetchingData = true;

                await this.getAttributesForLanguage({
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
