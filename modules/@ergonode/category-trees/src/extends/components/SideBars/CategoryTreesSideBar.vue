/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <SideBar
        :title="$t('categoryTree.sideBar.searchHeader')"
        :items="filteredCategoryTrees"
        :expanded="isAnySearchPhrase || expendedCategoryTree"
        :searchable="true"
        :search-value="searchValue"
        @search="onSearch">
        <template #header>
            <ListSearchHeader
                :title="$t('categoryTree.sideBar.searchHeader')"
                :search-value="searchValue"
                :searchable="true"
                @search="onSearch" />
        </template>
        <template #body>
            <Preloader v-if="isPrefetchingData" />
        </template>
        <template #noDataPlaceholder>
            <SideBarNoDataPlaceholder
                :title="$t('categoryTree.sideBar.placeholderTitle')"
                :subtitle="$t('categoryTree.sideBar.placeholderSubtitle')">
                <template #action>
                    <CreateCategoryTreeButton />
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
                :item="{...item, level: item.level - 1 }"
                :multiselect="true"
                :selected-nodes-count="selectedNodesCount[item.id]"
                :selected="selectedCategories[item.id]"
                @expand="onExpand"
                @input="onSelectCategory" />
        </template>
    </SideBar>
</template>

<script>
import {
    getAutocomplete as getCategoriesAutocomplete,
} from '@Categories/services';
import {
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import {
    FILTER_OPERATOR,
} from '@Core/defaults/operators';
import {
    dfsSearch,
} from '@Core/models/arrayWrapper';
import {
    getMappedFilters,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import CreateCategoryTreeButton from '@Trees/components/Buttons/CreateCategoryTreeButton';
import {
    CATEGORY_TREE_CREATED_EVENT_NAME,
} from '@Trees/defaults';
import CategoryTreeSideBarGroupElement from '@Trees/extends/components/SideBars/CategoryTreeSideBarGroupElement';
import {
    getCategoriesCount,
    getMappedCategories,
} from '@Trees/models/treeMapper';
import {
    get as getCategoryTree,
    getAutocomplete as getCategoryTreesAutocomplete,
} from '@Trees/services';
import ListSearchHeader from '@UI/components/List/ListSearchHeader';
import Preloader from '@UI/components/Preloader/Preloader';
import SideBar from '@UI/components/SideBar/SideBar';
import SideBarNoDataPlaceholder from '@UI/components/SideBar/SideBarNoDataPlaceholder';
import TreeAccordionItem from '@UI/components/TreeAccordion/TreeAccordionItem';
import {
    getSelectedNodesCount,
} from '@UI/models/treeAccordion';
import {
    debounce,
} from 'debounce';
import {
    mapState,
} from 'vuex';

export default {
    name: 'CategoryTreesSideBar',
    components: {
        CreateCategoryTreeButton,
        SideBarNoDataPlaceholder,
        CategoryTreeSideBarGroupElement,
        SideBar,
        ListSearchHeader,
        Preloader,
        TreeAccordionItem,
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

        const treesData = await Promise.all(trees.map(tree => getCategoryTree({
            $axios: this.$axios,
            id: tree.id,
        })));

        this.categoryTrees = treesData
            .map(tree => ({
                ...tree,
                name: tree.name[this.defaultLanguageCode],
                children: getMappedCategories({
                    tree: tree.categories || [],
                    categories,
                }),
                itemsCount: getCategoriesCount(tree.categories),
            }))
            .filter(tree => tree.itemsCount > 0);

        this.isPrefetchingData = false;
    },
    data() {
        return {
            isPrefetchingData: true,
            categoryTrees: [],
            selectedCategories: {},
            expendedCategoryTree: {},
            searchValue: '',
            onDebounceSelectedCategories: null,
        };
    },
    computed: {
        ...mapState('core', [
            'defaultLanguageCode',
        ]),
        selectedNodesCount() {
            return getSelectedNodesCount({
                value: Object.keys(this.selectedCategories).map(key => ({
                    id: key,
                })),
                treeStructure: this.categoryTrees,
            });
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
        $route(from, to) {
            if (from.name !== to.name) {
                return;
            }

            this.selectedCategories = this.getSelectedCategories();
        },
    },
    created() {
        this.selectedCategories = this.getSelectedCategories();
        this.onDebounceSelectedCategories = debounce(this.setSelectedCategories, 500);
    },
    mounted() {
        document.documentElement.addEventListener(
            CATEGORY_TREE_CREATED_EVENT_NAME,
            this.onCategoryTreeCreated,
        );
    },
    beforeDestroy() {
        document.documentElement.removeEventListener(
            CATEGORY_TREE_CREATED_EVENT_NAME,
            this.onCategoryTreeCreated,
        );
        delete this.onDebounceSelectedCategories;
    },
    methods: {
        onSearchConditionCallback(filterValues, searchValue) {
            return filterValues.some(value => searchValue.startsWith(value));
        },
        onSelectCategory(category) {
            const isSelected = !this.selectedCategories[category.id];

            this.selectedCategories = {
                ...this.selectedCategories,
                [category.id]: isSelected,
            };

            this.onDebounceSelectedCategories();
        },
        async onCategoryTreeCreated() {
            // TODO
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
        getSelectedCategories() {
            const advancedFilters = getMappedFilters(this.$route.query.advancedFilter);
            const categoryFilters = advancedFilters[`esa_category:${this.defaultLanguageCode}`];
            const selectedCategories = {};

            if (categoryFilters) {
                categoryFilters[FILTER_OPERATOR.EQUAL].forEach((categoryId) => {
                    selectedCategories[categoryId] = true;
                });
            }

            return selectedCategories;
        },
        setSelectedCategories() {
            const advancedFilters = getMappedFilters(this.$route.query.advancedFilter);
            let categoryFilters = advancedFilters[`esa_category:${this.defaultLanguageCode}`];

            const equalOperator = FILTER_OPERATOR.EQUAL;

            Object.keys(this.selectedCategories).forEach((key) => {
                if (this.selectedCategories[key]) {
                    if (typeof categoryFilters === 'undefined') {
                        categoryFilters = {
                            [equalOperator]: [],
                        };
                    }

                    if (!categoryFilters[equalOperator].some(categoryId => categoryId === key)) {
                        categoryFilters[equalOperator].push(key);
                    }
                } else if (typeof categoryFilters !== 'undefined') {
                    categoryFilters[equalOperator] = categoryFilters[equalOperator].filter(
                        categoryId => categoryId !== key,
                    );
                }
            });

            this.$router.replace({
                query: {
                    ...this.$route.query,
                    advancedFilter: getParsedFilters({
                        ...advancedFilters,
                        [`esa_category:${this.defaultLanguageCode}`]: categoryFilters,
                    }),
                    page: DEFAULT_PAGE,
                },
            });
        },
    },
};
</script>
