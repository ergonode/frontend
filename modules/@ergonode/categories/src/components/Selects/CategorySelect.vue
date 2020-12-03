/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <InputSolidStyle class="category-select">
        <template #activator>
            <InputController>
                <InputLabel
                    :style="{ top: '-2px' }"
                    :required="required"
                    :size="size"
                    :floating="true"
                    :disabled="disabled"
                    :label="label" />
                <div class="category-select__header">
                    <div class="horizontal-container">
                        <ExpandNumericButton
                            title="FILTERS"
                            :number="advancedFilterValuesCount"
                            :is-expanded="isFiltersExpanded"
                            @click.native="onFiltersExpand" />
                        <Toggler
                            label="Show only selected"
                            reversed />
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
                    <SelectList
                        v-if="isSelectContentVisible"
                        :search-value="searchValue"
                        :items="categories"
                        :size="size"
                        search-placeholder="Search for category…"
                        :multiselect="true"
                        @search="onSearch">
                        <template #appendHeader>
                            <CheckBox
                                class="check-box-select-all"
                                label="Select all"
                                reversed />
                        </template>
                        <template #item="{ item, isSelected }">
                            <ListElementAction :size="size">
                                <CheckBox :value="isSelected" />
                            </ListElementAction>
                            <ListElementDescription>
                                <ListElementTitle
                                    :size="size"
                                    :title="item.label || `#${item.code}`" />
                            </ListElementDescription>
                        </template>
                    </SelectList>
                    <div
                        v-show="categories.length"
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
import SelectList from '@UI/components/Select/List/SelectList';
import Toggler from '@UI/components/Toggler/Toggler';

export default {
    name: 'CategorySelect',
    components: {
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
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines if the given component is required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * The size of the component
         */
        size: {
            type: String,
            default: SIZE.SMALL,
            validator: value => [
                SIZE.SMALL,
                SIZE.REGULAR,
            ].indexOf(value) !== -1,
        },
    },
    async fetch() {
        this.categories = await getAutocomplete({
            $axios: this.$axios,
        });
        this.originalCategories = this.categories;

        this.isFetchingData = false;
    },
    data() {
        return {
            originalCategories: [],
            categories: [],
            advancedFilterValues: {},
            isFiltersExpanded: false,
            isItemsExpanded: false,
            isFetchingData: true,
            searchValue: '',
        };
    },
    computed: {
        categorySelectItemsClasses() {
            return [
                'category-select__items',
                {
                    'category-select__items--expanded': this.isItemsExpanded,
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
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isSelectContentVisible() {
            return this.isAnyItem || this.isAnySearchPhrase;
        },
        isAllowedToCreate() {
            return this.$hasAccess([
                PRIVILEGES.CATEGORY.create,
            ]);
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
                    id: 'category-tree',
                    type: 'CATEGORY_TREE',
                    label: 'Category tree',
                },
            ];
        },
        extendedFilterComponents() {
            return this.$getExtendedComponents('@UI/components/AdvancedFilters/Type');
        },
        advancedFilterValuesCount() {
            return Object.keys(this.advancedFilterValues).length;
        },
        isCategoryTreeSelected() {
            return this.advancedFilterValuesCount > 0;
        },
    },
    methods: {
        onAdvancedFilterChange(filters) {
            this.advancedFilterValues = filters;
        },
        onClearAdvancedFilters() {
            this.advancedFilterValues = {};
        },
        onSearch(value) {
            this.categories = this.originalCategories.filter(category => category.code.includes(value));

            this.searchValue = value;
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
            padding: 12px 0 48px;
            box-sizing: border-box;
            transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            will-change: border-color;

            &:not(&--expanded) {
                max-height: 376px;
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

    .check-box-select-all {
        margin-right: 12px;
    }

    .horizontal-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
