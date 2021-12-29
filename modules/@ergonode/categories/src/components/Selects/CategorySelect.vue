/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle :class="classes">
        <template #activator>
            <InputController>
                <InputLabel
                    :floating="true"
                    :disabled="!isAllowedToCreateCategory"
                    :label="label" />
                <div class="category-select__header">
                    <div class="horizontal-container">
                        <ExpandNumericButton
                            :title="$t('@Categories.category.components.CategorySelect.expandFilterButton')"
                            :number="isCategoryTreeSelected ? 1 : 0"
                            :is-expanded="isFiltersExpanded"
                            @click.native="onFiltersExpand" />
                        <Toggler
                            v-model="isSelectedOnlyVisibleCategories"
                            :label="$t('@Categories.category.components.CategorySelect.toggleVisibleToggler')"
                            :disabled="isSelectedCategoriesTogglerDisabled"
                            reversed
                            @input="onToggleBetweenCategoriesVisibility" />
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
                                    :title="$t('@Categories._.clear')"
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
                        class="category-select__list"
                        :search-placeholder="$t('@Categories.category.components.CategorySelect.searchPlaceholder')"
                        :value="selectedOptions"
                        :search-value="searchValue"
                        :items="categoryTreeItems"
                        :size="smallSize"
                        :expanded="isSelectedOnlyVisibleCategories || isAnySearchPhrase"
                        :searchable="true"
                        :selectable="true"
                        :multiselect="true"
                        @input="onValueChange"
                        @search="onSearch">
                        <template #appendSearchHeader>
                            <CategorySelectAllTreeCheckBox
                                :value="value"
                                :categories="categoryTreeItems"
                                :disabled="disabled || !isAnyCategoryInTreeAfterFiltering"
                                @input="onSelectAllVisible" />
                        </template>
                        <template #body>
                            <SelectListNoDataPlaceholder
                                v-if="!isAnyCategoryInTree"
                                :title="categoryTreePlaceholder.title"
                                :subtitle="categoryTreePlaceholder.subtitle">
                                <template #action>
                                    <Button
                                        :title="$t('@Categories.category.components.CategorySelect.goToButton')"
                                        :size="smallSize"
                                        :disabled="!isAllowedToUpdateTree"
                                        @click.native="onNavigateToCategoryTree" />
                                </template>
                            </SelectListNoDataPlaceholder>
                            <SelectListNoDataPlaceholder
                                v-else-if="isVisibleSelectedAnyCategoryInTree"
                                :title="categoryTreeNonVisiblePlaceholder.title"
                                :subtitle="categoryTreeNonVisiblePlaceholder.subtitle">
                                <template #action>
                                    <PlaceholderClearSearchButton
                                        :title="$t('@Categories.category.components.CategorySelect.clearSearchButtonLabel')"
                                        @click.native="onClearVisibilitySelection" />
                                </template>
                            </SelectListNoDataPlaceholder>
                        </template>
                    </TreeAccordion>
                    <SelectList
                        v-else
                        class="category-select__list"
                        :value="selectedOptions"
                        :search-value="searchValue"
                        :items="visibleCategoryItems"
                        :size="smallSize"
                        :search-placeholder="$t('@Categories.category.components.CategorySelect.searchPlaceholder')"
                        :searchable="true"
                        :selectable="true"
                        :multiselect="true"
                        option-key="id"
                        option-value="label"
                        @input="onValueChange"
                        @search="onSearch">
                        <template #appendSearchHeader>
                            <CategorySelectAllCheckBox
                                :value="value"
                                :categories="categoryItems"
                                :disabled="disabled || !isAnyCategoryAfterFiltering"
                                @input="onSelectAllVisible"
                            />
                        </template>
                        <template #noDataPlaceholder>
                            <SelectListNoDataPlaceholder
                                v-if="!isAnyCategory"
                                :title="categoriesPlaceholder.title"
                                :subtitle="categoriesPlaceholder.subtitle">
                                <template #action>
                                    <CreateCategoryButton />
                                </template>
                            </SelectListNoDataPlaceholder>
                            <SelectListNoDataPlaceholder
                                v-else-if="isVisibleSelectedAnyCategory"
                                :title="categoriesNonVisiblePlaceholder.title"
                                :subtitle="categoriesNonVisiblePlaceholder.subtitle">
                                <template #action>
                                    <PlaceholderClearSearchButton
                                        :title="$t('@Categories.category.components.CategorySelect.clearSearchButtonLabel')"
                                        @click.native="onClearVisibilitySelection" />
                                </template>
                            </SelectListNoDataPlaceholder>
                        </template>
                    </SelectList>
                    <div
                        v-show="isExpandButtonVisible"
                        class="category-select__expand-more">
                        <ExpandNumericButton
                            :title="$t('@Categories.category.components.CategorySelect.showAllExpandNumericButton')"
                            :size="tinySize"
                            :number="categoryItems.length"
                            :is-expanded="isCategoriesExpanded"
                            @click.native="onItemsExpand" />
                    </div>
                </template>
            </div>
        </template>
    </InputSolidStyle>
</template>

<script>
import CreateCategoryButton from '@Categories/components/Buttons/CreateCategoryButton';
import CategorySelectAllCheckBox from '@Categories/components/Selects/CategorySelectAllCategories';
import CategorySelectAllTreeCheckBox from '@Categories/components/Selects/CategorySelectAllTreeCategories';
import CATEGORY_PRIVILEGES from '@Categories/config/privileges';
import {
    CATEGORY_CREATED_EVENT_NAME,
} from '@Categories/defaults/attributes';
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
import TREE_PRIVILEGES from '@Trees/config/privileges';
import {
    ROUTE_NAME as CATEGORY_TREES_ROUTE_NAME,
} from '@Trees/config/routes';
import {
    getMappedCategories,
} from '@Trees/models/treeMapper';
import {
    get,
} from '@Trees/services';
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';
import AdvancedFiltersRemoveAllButton from '@UI/components/AdvancedFilters/AdvancedFiltersRemoveAllButton';

export default {
    name: 'CategorySelect',
    components: {
        CreateCategoryButton,
        CategorySelectAllTreeCheckBox,
        CategorySelectAllCheckBox,
        ExpandNumericButton,
        AdvancedFilters,
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    async fetch() {
        await this.getAllCategories();
    },
    data() {
        return {
            advancedFilterValues: {},
            isFiltersExpanded: false,
            isSelectedOnlyVisibleCategories: false,
            isCategoriesExpanded: false,
            isFetchingData: true,
            searchValue: '',
            allCategories: [],
            allCategoryTrees: {},
        };
    },
    computed: {
        classes() {
            return [
                'category-select',
                {
                    'category-select--no-data': !((this.isCategoryTreeSelected && this.isAnyCategoryInTreeAfterFiltering) || (!this.isCategoryTreeSelected && this.isAnyCategoryAfterFiltering)),
                },
            ];
        },
        categorySelectItemsClasses() {
            return [
                'category-select__items',
                {
                    'category-select__items--visible-expander': this.isExpandButtonVisible,
                },
            ];
        },
        label() {
            return this.$t('@Categories.category._.label');
        },
        categoriesPlaceholder() {
            return {
                title: this.$t('@Categories.category._.noItems'),
                subtitle: this.$t('@Categories.category._.createFirst'),
            };
        },
        categoriesNonVisiblePlaceholder() {
            return {
                title: this.$t('@Categories.category._.noItems'),
                subtitle: this.$t('@Categories.category.components.CategorySelect.noCategoriesSubtitle'),
            };
        },
        categoryTreePlaceholder() {
            return {
                title: this.$t('@Categories.category.components.CategorySelect.noCategoryInTreeTitle'),
                subtitle: this.$t('@Categories.category.components.CategorySelect.noCategoryInTreeSubtitle'),
            };
        },
        categoryTreeNonVisiblePlaceholder() {
            return {
                title: this.$t('@Categories.category._.noItems'),
                subtitle: this.$t('@Categories.category.components.CategorySelect.noCategoriesSubtitle'),
            };
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
                    label: this.$t('@Categories.category.components.CategorySelect.advancedFilterLabel'),
                },
            ];
        },
        extendedFilterComponents() {
            return this.$getExtendSlot('@UI/components/AdvancedFilters/Type');
        },
        categoryTreeItems() {
            if (this.value.length || !this.isSelectedOnlyVisibleCategories) {
                return dfsSearch(
                    this.allCategoryTrees[this.advancedFilterValues.categoryTree],
                    this.getFilterValue(),
                    [
                        'label',
                        'code',
                    ],
                    this.onSearchConditionCallback,
                );
            }

            return [];
        },
        visibleCategoryItems() {
            if (!this.isCategoriesExpanded) {
                return this.categoryItems.slice(0, 7);
            }

            return this.categoryItems;
        },
        categoryItems() {
            if (this.value.length || !this.isSelectedOnlyVisibleCategories) {
                return simpleSearch(
                    this.allCategories,
                    this.getFilterValue(),
                    [
                        'label',
                        'code',
                    ],
                    this.onSearchConditionCallback,
                );
            }

            return [];
        },
        isExpandButtonVisible() {
            return this.isAnyCategoryAfterFiltering
                && !this.isCategoryTreeSelected
                && this.categoryItems.length > 7;
        },
        isSelectedCategoriesTogglerDisabled() {
            if (this.isCategoryTreeSelected) {
                return !this.isAnyCategoryInTree;
            }

            return !this.isAnyCategory;
        },
        isVisibleSelectedAnyCategory() {
            return !this.isAnyCategoryAfterFiltering && this.isSelectedOnlyVisibleCategories;
        },
        isVisibleSelectedAnyCategoryInTree() {
            return !this.isAnyCategoryInTreeAfterFiltering && this.isSelectedOnlyVisibleCategories;
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isCategoryTreeSelected() {
            return Boolean(this.advancedFilterValues.categoryTree);
        },
        isAnyCategoryAfterFiltering() {
            return this.categoryItems.length > 0;
        },
        isAnyCategory() {
            return this.allCategories.length > 0;
        },
        isAnyCategoryInTree() {
            if (!this.allCategoryTrees[this.advancedFilterValues.categoryTree]) {
                return false;
            }

            return this.isCategoryTreeSelected
                && this.allCategoryTrees[this.advancedFilterValues.categoryTree].length > 0;
        },
        isAnyCategoryInTreeAfterFiltering() {
            return this.isCategoryTreeSelected
                && this.categoryTreeItems.length > 0;
        },
        isAllowedToCreateCategory() {
            return this.$hasAccess([
                CATEGORY_PRIVILEGES.CATEGORY.create,
            ]);
        },
        isAllowedToUpdateTree() {
            return this.$hasAccess([
                TREE_PRIVILEGES.CATEGORY_TREE.update,
            ]);
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
        async onCategoryCreated() {
            await this.getAllCategories();
        },
        onSelectAllVisible(value) {
            this.$emit('input', value);
        },
        onToggleBetweenCategoriesVisibility(value) {
            this.isSelectedOnlyVisibleCategories = value;
        },
        onClearVisibilitySelection() {
            this.isSelectedOnlyVisibleCategories = false;
        },
        async onAdvancedFilterChange(filters) {
            this.advancedFilterValues = filters;

            if (this.isCategoryTreeSelected
                && typeof this.allCategoryTrees[filters.categoryTree] === 'undefined') {
                this.isFetchingData = true;

                const categoryTree = await get({
                    $axios: this.$axios,
                    id: filters.categoryTree,
                });

                this.allCategoryTrees = {
                    ...this.allCategoryTrees,
                    [filters.categoryTree]: getMappedCategories({
                        tree: categoryTree.categories,
                        categories: this.allCategories,
                    }),
                };

                this.isFetchingData = false;
            }
        },
        onClearAdvancedFilters() {
            this.advancedFilterValues = {};
        },
        onSearch(value) {
            this.searchValue = value;
        },
        onSearchConditionCallback(filterValues, searchValue) {
            if (this.isSelectedOnlyVisibleCategories) {
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
            this.isCategoriesExpanded = !this.isCategoriesExpanded;
        },
        onNavigateToCategoryTree() {
            this.$router.push({
                name: CATEGORY_TREES_ROUTE_NAME.CATEGORY_TREE_EDIT,
                params: {
                    id: this.advancedFilterValues.categoryTree,
                },
            });
        },
        async getAllCategories() {
            this.isFetchingData = true;

            const categories = await getAutocomplete({
                $axios: this.$axios,
            });

            this.allCategories = categories.map(category => ({
                id: category.id,
                label: category.label || `#${category.code}`,
                disabled: this.disabled,
            }));

            this.isFetchingData = false;
        },
        getFilterValue() {
            return this.isSelectedOnlyVisibleCategories
                ? this.selectedOptionsLabels
                : this.searchValue;
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

        &__list {
            padding: 0 8px;
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
            padding: 12px 0;
            border-top: unset;
            box-sizing: border-box;
            transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            will-change: border-color;

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
