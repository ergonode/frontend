/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilter
        :index="index"
        :value="parsedFilterValue"
        :title="filter.label"
        :filter-id="filter.id"
        :fixed-content="!(isPlaceholderVisible || isSearchPlaceholderVisible)"
        @remove="onRemove"
        @swap="onSwap">
        <template #body>
            <AdvancedFilterContent>
                <DropdownPlaceholder
                    v-if="isPlaceholderVisible"
                    :title="placeholder.title"
                    :subtitle="placeholder.subtitle" />
                <SelectList
                    v-else-if="isContentVisible"
                    :value="filterValue"
                    :search-value="searchValue"
                    :items="options"
                    :size="smallSize"
                    @input="onValueChange"
                    @search="onSearch">
                    <template #item="{ item, isSelected }">
                        <slot
                            name="option"
                            :option="item"
                            :is-selected="isSelected">
                            <ListElementDescription>
                                <ListElementTitle
                                    :size="smallSize"
                                    :title="item.label || `#${item.code}`" />
                            </ListElementDescription>
                        </slot>
                    </template>
                </SelectList>
            </AdvancedFilterContent>
            <SelectDropdownFooter @clear="onClear" />
        </template>
    </AdvancedFilter>
</template>

<script>
import PRIVILEGES from '@Attributes/config/privileges';
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    ROUTE_NAME,
} from '@Trees/config/routes';
import {
    getAutocomplete,
} from '@Trees/services';
import AdvancedFilter from '@UI/components/AdvancedFilters/AdvancedFilter';
import AdvancedFilterContent from '@UI/components/AdvancedFilters/Content/AdvancedFilterContent';
import ListElementDescription from '@UI/components/List/ListElementDescription';
import ListElementTitle from '@UI/components/List/ListElementTitle';
import SelectDropdownFooter from '@UI/components/Select/Dropdown/Footers/SelectDropdownFooter';
import DropdownPlaceholder from '@UI/components/Select/Dropdown/Placeholder/DropdownPlaceholder';
import SelectList from '@UI/components/Select/List/SelectList';

export default {
    name: 'AdvancedFilterCategoryTreeType',
    components: {
        AdvancedFilter,
        AdvancedFilterContent,
        SelectDropdownFooter,
        SelectList,
        DropdownPlaceholder,
        ListElementDescription,
        ListElementTitle,
    },
    props: {
        /**
         * Index of given component at the loop
         */
        index: {
            type: Number,
            required: true,
        },
        /**
         * Filter data model
         */
        filter: {
            type: Object,
            required: true,
        },
        /**
         * Component value
         */
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            options: [],
            allOptions: [],
            localValue: {},
            searchValue: '',
            isFetchingData: false,
        };
    },
    computed: {
        isAllowedToUpdate() {
            return this.$hasAccess([
                PRIVILEGES.ATTRIBUTE.update,
            ]);
        },
        placeholder() {
            return {
                title: 'No category tree',
                subtitle: 'There are no category trees in the system, so you can create the first one.',
            };
        },
        smallSize() {
            return SIZE.SMALL;
        },
        filterValue() {
            if (!this.value) {
                return null;
            }

            return this.allOptions.find(option => option.id === this.value);
        },
        parsedFilterValue() {
            if (!this.filterValue) {
                return '';
            }

            return this.filterValue.label || `#${this.filterValue.code}`;
        },
        isAnySearchPhrase() {
            return this.searchValue !== '';
        },
        isAnyOption() {
            return this.options.length > 0;
        },
        isPlaceholderVisible() {
            return !this.isAnyOption && !this.isAnySearchPhrase;
        },
        isSearchPlaceholderVisible() {
            return !this.isAnyOption && this.isAnySearchPhrase;
        },
        isContentVisible() {
            return this.isAnyOption || this.isAnySearchPhrase;
        },
    },
    async created() {
        await this.getOptions();

        this.allOptions = this.options;
    },
    methods: {
        onNavigateToCategoryTrees() {
            this.$router.push({
                name: ROUTE_NAME.CATEGORY_TREES_GRID,
            });
        },
        onRemove(index) {
            this.$emit('remove', index);
        },
        onSwap(payload) {
            this.$emit('swap', payload);
        },
        onClear() {
            this.$emit('apply', {
                key: this.filter.id,
                value: '',
            });
        },
        onClearSearch() {
            this.onSearch('');
        },
        onSearch(value) {
            if (this.searchValue !== value) {
                this.searchValue = value;

                if (this.searchValue === '') {
                    this.options = this.allOptions;
                } else {
                    this.getOptions();
                }
            }
        },
        onFocus(isFocused) {
            this.$emit('focus', isFocused);
        },
        onValueChange(value) {
            if (value) {
                this.$emit('apply', {
                    key: this.filter.id,
                    value: value.id,
                });
            } else {
                this.$emit('apply', {
                    key: this.filter.id,
                    value,
                });
            }
        },
        async getOptions() {
            try {
                this.isFetchingData = true;

                this.options = await getAutocomplete({
                    $axios: this.$axios,
                    config: {
                        params: {
                            search: this.searchValue,
                            type: this.filterType,
                        },
                    },
                });

                console.log(this.options);

                this.isFetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.isFetchingData = false;
            }
        },
    },
};
</script>
