/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <AdvancedFilter
        :scope="scope"
        :index="index"
        :value="parsedFilterValue"
        :title="filter.label"
        :filter-id="filter.id"
        :dismissible="true"
        :fixed-content="isFixedContent"
        @remove="onRemove"
        @swap="onSwap">
        <template #dropdown>
            <SelectList
                :items-max-height="itemsMaxHeight"
                :value="filterValue"
                :search-value="searchValue"
                :items="options"
                :size="smallSize"
                :searchable="true"
                option-key="id"
                option-value="label"
                @input="onValueChange"
                @search="onSearch">
                <template #noDataPlaceholder>
                    <SelectListNoDataPlaceholder
                        :title="placeholder.title"
                        :subtitle="placeholder.subtitle">
                        <template #action>
                            <CreateCategoryTreeButton />
                        </template>
                    </SelectListNoDataPlaceholder>
                </template>
            </SelectList>
            <SelectDropdownFooter
                v-if="allOptions.length > 0"
                @clear="onClear" />
        </template>
    </AdvancedFilter>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import CreateCategoryTreeButton from '@Trees/components/Buttons/CreateCategoryTreeButton';
import {
    CATEGORY_TREE_CREATED_EVENT_NAME,
} from '@Trees/defaults';
import {
    getAutocomplete,
} from '@Trees/services';
import {
    DROPDOWN_MAX_HEIGHT,
} from '@UI/assets/scss/_js-variables/sizes.scss';
import AdvancedFilter from '@UI/components/AdvancedFilters/AdvancedFilter';
import debounce from 'debounce';

export default {
    name: 'AdvancedFilterCategoryTreeType',
    components: {
        CreateCategoryTreeButton,
        AdvancedFilter,
    },
    props: {
        /**
         * Context scope
         */
        scope: {
            type: String,
            default: '',
        },
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
            onDebounceGetOptions: null,
        };
    },
    computed: {
        itemsMaxHeight() {
            return DROPDOWN_MAX_HEIGHT;
        },
        placeholder() {
            return {
                title: this.$t('@Trees.tree._.noTrees'),
                subtitle: this.$t('@Trees.tree._.createFirst'),
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
        isFixedContent() {
            return !(this.isPlaceholderVisible || this.isSearchPlaceholderVisible);
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
    },
    async created() {
        this.onDebounceGetOptions = debounce(this.getOptions, 500);

        await this.getOptions();

        this.allOptions = this.options;
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
    },
    methods: {
        async onCategoryTreeCreated() {
            await this.getOptions();

            this.allOptions = this.options;
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
        onSearch(value) {
            this.searchValue = value;

            if (value === '') {
                this.options = this.allOptions;
            } else {
                this.onDebounceGetOptions();
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

                const options = await getAutocomplete({
                    $axios: this.$axios,
                    config: {
                        params: {
                            search: this.searchValue,
                            type: this.filterType,
                        },
                    },
                });

                this.options = options.map(option => ({
                    id: option.id,
                    label: option.label || `#${option.code}`,
                }));

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
