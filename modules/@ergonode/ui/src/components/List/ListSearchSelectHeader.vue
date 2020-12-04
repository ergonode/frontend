/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :title="title">
        <slot
            v-if="!isSearchButtonClicked"
            name="select">
            <Select
                :value="selectedOption"
                :size="smallSize"
                :options="options"
                @input="onLanguageSelect" />
        </slot>
        <TextField
            v-else
            :value="searchValue"
            autofocus
            :size="smallSize"
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            class="search-button"
            @click.native="onSearchButtonClick">
            <template #icon="{ color }">
                <Component
                    :is="searchButtonIconComponent"
                    :fill-color="color" />
            </template>
        </Fab>
    </ListHeader>
</template>

<script>
import {
    SIZE,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
    WHITE,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Fab from '@UI/components/Fab/Fab';
import IconSearch from '@UI/components/Icons/Actions/IconSearch';
import ListHeader from '@UI/components/List/ListHeader';
import Select from '@UI/components/Select/Select';
import TextField from '@UI/components/TextField/TextField';
import {
    debounce,
} from 'debounce';

export default {
    name: 'ListSearchSelectHeader',
    components: {
        ListHeader,
        Fab,
        Select,
        TextField,
        IconSearch,
    },
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * Component variances that user can choose from
         */
        options: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Value of selected option
         */
        selectedOption: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSearchButtonClicked: false,
            isSearchFocused: false,
            searchValue: null,
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        whiteColor() {
            return WHITE;
        },
        searchButtonIconComponent() {
            return this.isSearchButtonClicked
                ? () => import('@UI/components/Icons/Window/IconClose')
                : IconSearch;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
    },
    methods: {
        onSearch(value) {
            this.searchValue = value;
            this.$emit('search-value', value);
        },
        onLanguageSelect(value) {
            this.$emit('select-option', value);
        },
        onSearchButtonClick() {
            this.isSearchButtonClicked = !this.isSearchButtonClicked;

            if (!this.isSearchButtonClicked && this.searchValue !== '') {
                this.searchValue = '';
                this.onSearch(this.searchValue);
            }
        },
        onSearchFocus(isFocused) {
            this.isSearchFocused = isFocused;
        },
    },
};
</script>

<style lang="scss" scoped>
    .search-button {
        grid-column: 2;
        grid-row: 2;
    }
</style>
