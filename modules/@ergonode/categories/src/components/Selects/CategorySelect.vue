/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle class="category-select">
        <template #activator>
            <InputController>
                <InputLabel
                    :style="{ top: 0 }"
                    :required="required"
                    :floating="true"
                    :disabled="isAllowedToCreate"
                    :label="label" />
                <div class="category-select__header">
                    <div class="horizontal-container">
                        <ExpandNumericButton
                            title="FILTERS"
                            :number="isCategoryTreeSelected ? 1 : 0"
                            :is-expanded="isFiltersExpanded"
                            @click.native="onFiltersExpand" />
                        <Toggler
                            v-model="isOnlySelectedCategoriesVisible"
                            label="Show only selected"
                            reversed
                            @input="onToggleBetweenSelectedCategories" />
                    </div>
                    <div
                        v-show="isFiltersExpanded"
                        class="category-select__filters">
                        <AdvancedFilters
                            :value="advancedFilterValues"
                            :filters="advancedFilters"
                            :extended-filters="extendedFilterComponents"
                            :draggable="false"
                            @input="onAdvancedFilterChange">
                            <template #removeAllButton>
                                <AdvancedFiltersRemoveAllButton
                                    v-if="isCategoryTreeSelected"
                                    title="Clear"
                                    @click.native="onClearAdvancedFilters" />
                                <div v-else />
                            </template>
                        </AdvancedFilters>
                    </div>
                </div>
            </InputController>
        </template>
        <template #details>
            <div :class="categorySelectItemsClasses">
                <Preloader v-if="isFetchingData" />
                <template v-else>
                    <TreeAccordion
                        v-if="isCategoryTreeSelected"
                        search-placeholder="Search for category…"
                        :value="selectedOptions"
                        :search-value="searchValue"
                        :items="categoryTrees[advancedFilterValues.categoryTree]"
                        :size="smallSize"
                        :searchable="true"
                        :selectable="true"
                        :multiselect="true"
                        :expanded="true"
                        @input="onValueChange"
                        @search="onSearchTree" />
                    <SelectList
                        v-else
                        :value="selectedOptions"
                        :search-value="searchValue"
                        :items="categories"
                        :size="smallSize"
                        search-placeholder="Search for category…"
                        :searchable="true"
                        :selectable="true"
                        :multiselect="true"
                        @input="onValueChange"
                        @search="onSearch">
                        <template #item="{ item, isSelected }">
                            <ListElementAction :size="smallSize">
                                <CheckBox :value="isSelected" />
                            </ListElementAction>
                            <ListElementDescription>
                                <ListElementTitle
                                    :size="smallSize"
                                    :title="item.label || `#${item.code}`" />
                            </ListElementDescription>
                        </template>
                    </SelectList>
                    <div
                        v-show="isAnyItem && !isCategoryTreeSelected"
                        class="category-select__expand-more">
                        <ExpandNumericButton
                            title="SHOW ALL"
                            :size="tinySize"
                            :number="categories.length"
                            :is-expanded="isItemsExpanded"
                            @click.native="onItemsExpand" />
                    </div>
                </template>
            </div>
        </template>
    </InputSolidStyle>
</template>

<script>
import PRIVILEGES from '@Categories/config/privileges';
import {
    ROUTE_NAME,
} from '@Categories/config/routes';
import {
    getAutocomplete,
} from '@Categories/services';
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    dfsSearch,
    simpleSearch,
} from '@Core/models/arrayWrapper';
import {
    get,
} from '@Trees/services';
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';
import AdvancedFiltersRemoveAllButton from '@UI/components/AdvancedFilters/AdvancedFiltersRemoveAllButton';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Preloader from '@UI/components/Preloader/Preloader';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/SelectList/SelectList';
import Toggler from '@UI/components/Toggler/Toggler';
import TreeAccordion from '@UI/components/TreeAccordion/TreeAccordion';

export default {
    name: 'CategorySelect',
    components: {
        TreeAccordion,
        InputSolidStyle,
        InputController,
        InputLabel,
        ListElementTitle,
        ListElementAction,
        ListElementDescription,
        DropdownPlaceholder,
        Toggler,
        CheckBox,
        ExpandNumericButton,
        AdvancedFilters,
        Preloader,
        SelectList,
        AdvancedFiltersRemoveAllButton,
    },
    props: {
        /**
         * Component value
         */
        value: {
            type: Array,
            default: () => [],
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
    },
    async fetch() {
        this.categories = await getAutocomplete({
            $axios: this.$axios,
        });
        this.allCategories = this.categories.map(category => ({
            ...category,

        }));

        this.isFetchingData = false;
    },
    data() {
        return {
            allCategories: [],
            categories: [],
            advancedFilterValues: {},
            isFiltersExpanded: false,
            isOnlySelectedCategoriesVisible: false,
            isItemsExpanded: false,
            isFetchingData: true,
            searchValue: '',
            categoryTrees: {},
            allCategoryTrees: {},
        };
    },
    computed: {
        categorySelectItemsClasses() {
            return [
                'category-select__items',
                {
                    'category-select__items--expanded': this.isItemsExpanded,
                    'category-select__items--visible-expander': !this.isCategoryTreeSelected && this.isAnyItem,
                },
            ];
        },
        label() {
            return 'Category';
        },
        placeholder() {
            return {
                title: 'No categories',
                subtitle: 'There are no categories in the system, so you can create the first one.',
            };
        },
        isAnyItem() {
            return this.categories.length > 0;
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.create,
            ]);
        },
        selectedOptions() {
            return this.allCategories.filter(option => this.value.some(id => option.id === id));
        },
        selectedOptionsLabels() {
            return this.selectedOptions.map(({
                label,
                code,
            }) => label || code);
        },
        smallSize() {
            return SIZE.SMALL;
        },
        tinySize() {
            return SIZE.TINY;
        },
        advancedFilters() {
            return [
                {
                    id: 'categoryTree',
                    type: 'CATEGORY_TREE',
                    label: 'Category tree',
                },
            ];
        },
        extendedFilterComponents() {
            return this.$getExtendedComponents('@UI/components/AdvancedFilters/Type');
        },
        isCategoryTreeSelected() {
            return Boolean(this.advancedFilterValues.categoryTree);
        },
    },
    methods: {
        onToggleBetweenSelectedCategories(value) {
            this.isOnlySelectedCategoriesVisible = value;

            if (this.isCategoryTreeSelected) {
                this.categoryTrees = {
                    ...this.categoryTrees,
                    [this.advancedFilterValues.categoryTree]: dfsSearch(
                        this.allCategoryTrees[this.advancedFilterValues.categoryTree],
                        this.getFilterValue(),
                        [
                            'label',
                            'code',
                        ],
                        this.onSearchConditionCallback,
                    ),
                };
            } else {
                this.categories = simpleSearch(
                    this.allCategories,
                    this.getFilterValue(),
                    [
                        'label',
                        'code',
                    ],
                    this.onSearchConditionCallback,
                );
            }
        },
        async onAdvancedFilterChange(filters) {
            this.advancedFilterValues = filters;

            if (this.isCategoryTreeSelected
                && typeof this.categoryTrees[filters.categoryTree] === 'undefined') {
                this.isFetchingData = true;

                const categoryTree = await get({
                    $axios: this.$axios,
                    id: filters.categoryTree,
                });

                const getMappedCategories = (treeCategories = []) => {
                    const children = [];

                    treeCategories.forEach((treeCategory) => {
                        const category = this.allCategories.find(({
                            id,
                        }) => id === treeCategory.category_id);

                        children.push({
                            ...category,
                            children: getMappedCategories(treeCategory.children),
                        });
                    });

                    return children;
                };

                this.categoryTrees = {
                    ...this.categoryTrees,
                    [filters.categoryTree]: getMappedCategories(categoryTree.categories),
                };

                this.allCategoryTrees = {
                    ...this.categoryTrees,
                };

                this.isFetchingData = false;
            }
        },
        onClearAdvancedFilters() {
            this.advancedFilterValues = {};
        },
        onSearch(value) {
            this.searchValue = value;

            this.categories = simpleSearch(
                this.allCategories,
                this.getFilterValue(),
                [
                    'label',
                    'code',
                ],
                this.onSearchConditionCallback,
            );
        },
        onSearchTree(value) {
            this.searchValue = value;

            this.categoryTrees = {
                ...this.categoryTrees,
                [this.advancedFilterValues.categoryTree]: dfsSearch(
                    this.allCategoryTrees[this.advancedFilterValues.categoryTree],
                    this.getFilterValue(),
                    [
                        'label',
                        'code',
                    ],
                    this.onSearchConditionCallback,
                ),
            };
        },
        onSearchConditionCallback(filterValues, searchValue) {
            if (this.isOnlySelectedCategoriesVisible) {
                return filterValues.some(
                    value => searchValue === value && value.startsWith(this.searchValue),
                );
            }

            return filterValues.some(value => searchValue.startsWith(value));
        },
        onValueChange(value) {
            this.$emit('input', value.map(({
                id,
            }) => id));
        },
        onFiltersExpand() {
            this.isFiltersExpanded = !this.isFiltersExpanded;
        },
        onItemsExpand() {
            this.isItemsExpanded = !this.isItemsExpanded;
        },
        onNavigateToCategories() {
            this.$router.push({
                name: ROUTE_NAME.CATEGORIES_GRID,
            });
        },
        getFilterValue() {
            return this.isOnlySelectedCategoriesVisible ? this.selectedOptionsLabels : this.searchValue;
        },
    },
};
</script>

<style lang="scss" scoped>
    .category-select {
        $select: &;

        & > fieldset {
            border: unset !important;
        }

        &:hover {
            #{$select}__items {
                border-color: $GREY_DARK;
            }
        }

        &__header {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 4px 0 4px 2px;
            box-sizing: border-box;
        }

        &__items {
            position: relative;
            display: flex;
            flex-direction: column;
            border: $BORDER_1_GREY;
            border-top: unset;
            padding: 12px 0;
            box-sizing: border-box;
            transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            will-change: border-color;

            &:not(&--expanded) {
                max-height: 376px;
            }

            &--visible-expander {
                padding-bottom: 48px;
            }
        }

        &__expand-more {
            position: absolute;
            left: 0;
            bottom: 12px;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $WHITE;
        }
    }

    .horizontal-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
