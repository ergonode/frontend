/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('@Trees.productExtend.components.CategoryTreesSideBar.title')"
        :items="filteredCategoryTrees"
        :expanded="isAnySearchPhrase || expendedCategoryTree"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #header>
            <ListSearchHeader
                :title="$t('@Trees.productExtend.components.CategoryTreesSideBar.title')"
                :search-value="searchValue"
                :searchable="true"
                @search="onSearch" />
        </template>
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #noDataPlaceholder>
            <SideBarNoDataPlaceholder
                :title="$t('@Trees.tree._.noCategories')"
                :subtitle="$t('@Trees.tree._.createFirst')">
                <template #action>
                    <CreateCategoryButton />
                </template>
            </SideBarNoDataPlaceholder>
        </template>
        <template #item="{ item, onExpand }">
            <CategoryTreeSideBarGroupElement
                v-if="item.rootId === null"
                :group="item"
                @click.native="onExpandGroup({ item, onExpand })" />
            <TreeAccordionItem
                v-else
                :item="{...item, level: item.level - (item.notAssigned ? 2 : 1)}"
                :multiselect="true"
                :selected-nodes="selectedNodes[item.groupId][item.id]"
                :selected="selectedCategories[item.id]"
                @expand="onExpand"
                @input="onSelectCategory" />
        </template>
    </SideBar>
</template>

<script>
import CreateCategoryButton from '@Categories/components/Buttons/CreateCategoryButton';
import {
    CATEGORY_CREATED_EVENT_NAME,
} from '@Categories/defaults/attributes';
import {
    getAutocomplete as getCategoriesAutocomplete,
} from '@Categories/services';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    dfsSearch,
} from '@Core/models/arrayWrapper';
import {
    getUUID,
} from '@Core/models/stringWrapper';
import CategoryTreeSideBarGroupElement from '@Trees/extends/product/components/SideBars/CategoryTreeSideBarGroupElement';
import {
    getCategoryTrees,
} from '@Trees/models/treeMapper';
import {
    get as getCategoryTree,
    getAutocomplete as getCategoryTreesAutocomplete,
} from '@Trees/services';
import {
    getSelectedNodes,
} from '@UI/models/treeAccordion';
import {
    mapGetters,
} from 'vuex';

export default {
    name: 'CategoryTreesSideBar',
    components: {
        CategoryTreeSideBarGroupElement,
        CreateCategoryButton,
    },
    props: {
        scope: {
            type: String,
            default: '',
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        onValueChange: {
            type: Function,
            default: () => {},
        },
    },
    async fetch() {
        this.isPrefetchingData = true;

        const [
            trees,
            categories,
        ] = await Promise.all([
            getCategoryTreesAutocomplete({
                $axios: this.$axios,
            }),
            getCategoriesAutocomplete({
                $axios: this.$axios,
            }),
        ]);

        this.treesData = await Promise.all(trees.map(tree => getCategoryTree({
            $axios: this.$axios,
            id: tree.id,
        })));

        this.categoryTrees = getCategoryTrees({
            trees: this.treesData,
            categories,
            languageCode: this.defaultLanguageCode,
            notAssignedTreeLabel: this.$t('@Trees._.notAssigned'),
        });

        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            treesData: [],
            categoryTrees: [],
            selectedCategories: {},
            expendedCategoryTree: {},
            searchValue: '',
            onDebounceSelectedCategories: null,
        };
    },
    computed: {
        ...mapGetters('core', [
            'defaultLanguageCode',
        ]),
        selectedNodes() {
            return this.categoryTrees.reduce((prev, curr) => ({
                ...prev,
                [curr.id]: getSelectedNodes({
                    value: Object.keys(this.selectedCategories).map(key => ({
                        id: key,
                    })),
                    treeStructure: curr.children,
                }),
            }), {});
        },
        filteredCategoryTrees() {
            if (!this.isAnySearchPhrase) {
                return this.categoryTrees;
            }

            return dfsSearch(
                this.categoryTrees,
                this.searchValue,
                [
                    'label',
                    'code',
                ],
                this.onSearchConditionCallback,
            );
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
    },
    watch: {
        value: {
            immediate: true,
            handler() {
                const value = this.value[`esa_category:${this.defaultLanguageCode}`];

                const selectedCategories = {};

                if (value) {
                    value[FILTER_OPERATOR.EQUAL].forEach((categoryId) => {
                        selectedCategories[categoryId] = true;
                    });
                }

                this.selectedCategories = selectedCategories;
            },
        },
    },
    mounted() {
        document.documentElement.addEventListener(
            CATEGORY_CREATED_EVENT_NAME,
            this.onCategoryCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            CATEGORY_CREATED_EVENT_NAME,
            this.onCategoryCreated,
        );
    },
    methods: {
        async onCategoryCreated(event) {
            const categories = await getCategoriesAutocomplete({
                $axios: this.$axios,
            });

            const addedCategory = categories.find(category => category.id === event.detail.id);
            const notAssignedTreeIndex = this.categoryTrees.findIndex(tree => tree.name === this.$t('@Trees._.notAssigned'));

            if (notAssignedTreeIndex !== -1) {
                this.categoryTrees[notAssignedTreeIndex].children.push({
                    ...addedCategory,
                    notAssigned: true,
                });
                this.categoryTrees[notAssignedTreeIndex].itemsCount += 1;
            } else {
                this.categoryTrees.push({
                    id: getUUID(),
                    name: this.$t('@Trees._.notAssigned'),
                    children: [
                        {
                            ...addedCategory,
                            notAssigned: true,
                        },
                    ],
                    itemsCount: 1,
                });
            }

            this.categoryTrees = [
                ...this.categoryTrees,
            ];
        },
        onSearchConditionCallback(filterValues, searchValue) {
            return filterValues.some(value => searchValue.startsWith(value));
        },
        onSelectCategory(category) {
            let operatorValue = [];

            if (this.value[`esa_category:${this.defaultLanguageCode}`]) {
                operatorValue = this.value[`esa_category:${this.defaultLanguageCode}`][FILTER_OPERATOR.EQUAL] || [];

                const index = operatorValue.findIndex(categoryId => categoryId === category.id);

                if (index === -1) {
                    operatorValue.push(category.id);
                } else {
                    operatorValue.splice(index, 1);
                }
            } else {
                operatorValue.push(category.id);
            }

            this.onValueChange({
                ...this.value,
                [`esa_category:${this.defaultLanguageCode}`]: {
                    [FILTER_OPERATOR.EQUAL]: operatorValue,
                },
            });
        },
        async onExpandGroup({
            item,
            onExpand,
        }) {
            onExpand(item);

            this.expendedCategoryTree = {
                [item.id]: item.expanded,
            };
        },
        async onSearch(value) {
            this.searchValue = value;
        },
    },
};
</script>
