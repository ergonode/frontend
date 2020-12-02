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
                            :number="0"
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
                            :value="{}"
                            :filters="advancedFilters"
                            :extended-filters="extendedFilterComponents"
                            :draggable="false">
                            <template #removeAllButton>
                                <AdvancedFiltersRemoveAllButton
                                    v-show="isCategoryTreeChosen"
                                    title="Clear"
                                    @click.native="onClear" />
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
                    <div class="category-select__search-panel">
                        <SelectListSearch
                            placeholder="Search for category…"
                            :value="searchValue"
                            :size="size"
                            @input="onSearch" />
                        <CheckBox
                            label="Select all"
                            reversed />
                    </div>
                    <SelectList
                        v-if="isSelectContentVisible"
                        :items="categories"
                        :size="size"
                        :multiselect="true">
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
                    <DropdownPlaceholder
                        v-else
                        :title="noRecordsPlaceholder.title"
                        :subtitle="noRecordsPlaceholder.subtitle" />
                    <div class="category-select__expand-more">
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
    GRID_LAYOUT,
} from '@Core/defaults/grid';
import {
    SIZE,
} from '@Core/defaults/theme';
import AdvancedFilters from '@UI/components/AdvancedFilters/AdvancedFilters';
import AdvancedFiltersRemoveAllButton from '@UI/components/AdvancedFilters/AdvancedFiltersRemoveAllButton';
import Autocomplete from '@UI/components/Autocomplete/Autocomplete';
import Button from '@UI/components/Button/Button';
import CheckBox from '@UI/components/CheckBox/CheckBox';
import Divider from '@UI/components/Dividers/Divider';
import InputController from '@UI/components/Input/InputController';
import InputLabel from '@UI/components/Input/InputLabel';
import InputSolidStyle from '@UI/components/Input/InputSolidStyle';
import ListElementAction from '@UI/components/List/ListElementAction';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import Preloader from '@UI/components/Preloader/Preloader';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/Select/List/SelectList';
import SelectListSearch from '@UI/components/Select/List/SelectListSearch';
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
        SelectListSearch,
        Autocomplete,
        DropdownPlaceholder,
        Button,
        Divider,
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
            categoryTree: null,
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
        isCategoryTreeChosen() {
            return this.categoryTree !== null;
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
                    id: 'code_29:en_GB',
                    languageCode: 'en_GB',
                    type: 'CATEGORY_TREE',
                    label: 'Category tree',
                },
            ];
        },
        extendedFilterComponents() {
            return this.$getExtendedComponents('@UI/components/AdvancedFilters/Type');
        },
    },
    methods: {
        onClear() {

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

        &__search-panel {
            display: flex;
            justify-content: space-between;
            padding-right: 10px;
        }

        &__expand-more {
            position: absolute;
            left: 12px;
            bottom: 12px;
            background-color: $WHITE;
        }
    }

    .horizontal-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
