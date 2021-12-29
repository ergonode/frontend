/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@ProductBatchActions.productBatchAction._.title')"
        :items="groupedAttributesByLanguage"
        :expanded="expandedGroup"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #header>
            <ListSearchSelectHeader
                :title="$t('@ProductBatchActions.productBatchAction._.title')"
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
                :title="$t('@ProductBatchActions.productBatchAction.components.AttributesSideBar.noAttributesTitle')"
                :subtitle="$t('@ProductBatchActions.productBatchAction.components.AttributesSideBar.noAttributesSubtitle')" />
        </template>
        <template #item="{ item, onExpand }">
            <AttributeSideBarGroupElement
                v-if="item.rootId === null"
                :group="item"
                @click.native="onExpandGroup({ item, onExpand })" />
            <AttributeSideBarElement
                v-else
                :scope="scope"
                :item="item"
                :language-code="languageCode" />
        </template>
    </SideBar>
</template>

<script>
import LanguageTreeSelect from '@Core/components/Selects/LanguageTreeSelect';
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
import AttributeSideBarElement from '@ProductBatchActions/components/SideBars/AttributeSideBarElement';
import AttributeSideBarGroupElement from '@ProductBatchActions/components/SideBars/AttributeSideBarGroupElement';
import {
    getTemplates,
} from '@ProductBatchActions/services';
import {
    mapGetters,
} from 'vuex';

export default {
    name: 'AttributesSideBar',
    components: {
        AttributeSideBarGroupElement,
        LanguageTreeSelect,
        AttributeSideBarElement,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        filter: {
            type: [
                Object,
                String,
            ],
            default: () => ({}),
        },
    },
    async fetch() {
        this.templateIds = await getTemplates({
            $axios: this.$axios,
            payload: {
                filter: this.filter,
            },
        });

        await this.getAttributesForLanguage({
            languageCode: this.defaultLanguageCode,
        });
    },
    data() {
        return {
            isPrefetchingData: true,
            groupedAttributes: {},
            groupedAttributesBeforeSearch: {},
            expandedGroup: {},
            templateIds: [],
            languageCode: '',
            searchValue: '',
        };
    },
    computed: {
        ...mapGetters('core', [
            'rootLanguage',
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
    methods: {
        async onExpandGroup({
            item,
            onExpand,
        }) {
            onExpand(item);

            this.expandedGroup = {
                [item.id]: item.expanded,
            };
        },
        async getAttributesForLanguage({
            languageCode,
            limit = 99999,
        }) {
            if (this.templateIds.length) {
                let filter = `templates=${this.templateIds.join(',')}`;

                if (this.rootLanguage.code !== languageCode) {
                    filter += ';scope=local';
                }

                await getItems({
                    $axios: this.$axios,
                    path: `${languageCode}/attributes`,
                    languageCode,
                    params: {
                        limit,
                        offset: 0,
                        view: 'list',
                        filter,
                        field: 'code',
                        order: 'ASC',
                    },
                    onSuccess: this.onFetchItemsSuccess,
                });
            } else {
                this.isPrefetchingData = false;
            }
        },
        async onFetchItemsSuccess({
            items,
            languageCode,
        }) {
            const filteredItems = items.filter(({
                templates,
            }) => this.templateIds.every(template => templates.includes(template)));

            await getGroups({
                $axios: this.$axios,
                path: `${languageCode}/attributes/groups`,
                languageCode,
                onSuccess: ({
                    groups,
                }) => this.onFetchGroupsSuccess({
                    groups,
                    items: filteredItems,
                    languageCode,
                }),
            });
        },
        onFetchGroupsSuccess({
            groups,
            items,
            languageCode,
        }) {
            const unassignedItems = items.filter(item => !item.groups.length);
            const assignedItems = items.filter(item => item.groups.length);
            const itemsGroups = Array.from(new Set(assignedItems.reduce((prev, curr) => [
                ...prev,
                ...curr.groups,
            ], [])));

            itemsGroups.forEach((groupId) => {
                const group = groups.find(grp => grp.id === groupId);

                if (group) {
                    if (typeof this.groupedAttributes[languageCode] === 'undefined') {
                        this.groupedAttributes[languageCode] = [];
                    }

                    const groupItems = items.filter(
                        item => item.groups.some(
                            itemGrpId => itemGrpId === groupId,
                        ),
                    );

                    this.groupedAttributes[languageCode].push({
                        ...group,
                        itemsCount: groupItems.length,
                        children: groupItems,
                    });
                }
            });

            if (unassignedItems.length) {
                if (typeof this.groupedAttributes[languageCode] === 'undefined') {
                    this.groupedAttributes[languageCode] = [];
                }

                this.groupedAttributes[languageCode].push({
                    id: UNASSIGNED_GROUP_ID,
                    key: getUUID(),
                    value: this.$t('@ProductBatchActions.productBatchAction.components.AttributesSideBar.notAssigned'),
                    hint: '',
                    itemsCount: unassignedItems.length,
                    children: unassignedItems,
                });
            }

            this.groupedAttributes = {
                ...this.groupedAttributes,
            };

            this.isPrefetchingData = false;
        },
        async onSearch(value) {
            if (this.searchValue === '') {
                this.groupedAttributesBeforeSearch = deepClone(this.groupedAttributes);
            }

            this.searchValue = value;

            if (value !== '') {
                const lowerCaseFilterValue = value.toLowerCase();

                const groupedAttributes = [];

                this.groupedAttributesBeforeSearch[this.languageCode].forEach((group) => {
                    const children = [];

                    group.children.forEach((child) => {
                        if (child.code.toLowerCase().includes(lowerCaseFilterValue)) {
                            children.push(child);
                        }
                    });

                    if (children.length) {
                        groupedAttributes.push({
                            ...group,
                            itemsCount: children.length,
                            children,
                        });
                    }
                });

                this.groupedAttributes[this.languageCode] = groupedAttributes;
            } else {
                this.groupedAttributes = deepClone(this.groupedAttributesBeforeSearch);
                this.groupedAttributesBeforeSearch = {};
            }
        },
        async onSelectLanguage(value) {
            if (typeof this.groupedAttributes[value] === 'undefined') {
                this.isPrefetchingData = true;

                await this.getAttributesForLanguage({
                    languageCode: value,
                });
            }

            this.languageCode = value;
        },
    },
};
</script>
