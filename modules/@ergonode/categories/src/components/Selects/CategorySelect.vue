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
                            :filters="[]" />
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
                            :value="searchValue"
                            :size="size"
                            @input="onSearch" />
                        <CheckBox
                            label="Select all"
                            reversed />
                    </div>
                    <SelectList
                        :items="categories"
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
                    <ExpandNumericButton
                        title="SHOW ALL"
                        :size="tinySize"
                        :number="categories.length"
                        :is-expanded="isItemsExpanded"
                        @click.native="onItemsExpand" />
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
            default: SIZE.REGULAR,
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
    },
    methods: {
        onSearch(value) {
            this.categories = this.originalCategories.filter(category => category.code.includes(value));

            this.serachValue = value;

            console.log(value);
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
            display: flex;
            flex-direction: column;
            border: $BORDER_1_GREY;
            border-top: unset;
            margin-bottom: 36px;
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
    }

    .horizontal-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
