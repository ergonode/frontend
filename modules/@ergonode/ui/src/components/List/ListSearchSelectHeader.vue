/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
            @input="onDebounceSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            class="search-button"
            :theme="secondaryTheme"
            @click.native="onSearchButtonClick">
            <template #icon="{ color }">
                <IconClose
                    v-if="isSearchButtonClicked"
                    :fill-color="color" />
                <IconSearch
                    v-else
                    :fill-color="color" />
            </template>
        </Fab>
    </ListHeader>
</template>

<script>
import {
    SIZE,
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import {
    debounce,
} from 'debounce';

export default {
    name: 'ListSearchSelectHeader',
    props: {
        /**
         * The title of the component
         */
        title: {
            type: String,
            required: true,
        },
        /**
         * Search value
         */
        searchValue: {
            type: String,
            default: '',
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
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    created() {
        this.onDebounceSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.onDebounceSearch;
    },
    methods: {
        onSearch(value) {
            this.$emit('search', value);
        },
        onLanguageSelect(value) {
            this.$emit('select-option', value);
        },
        onSearchButtonClick() {
            this.isSearchButtonClicked = !this.isSearchButtonClicked;

            if (!this.isSearchButtonClicked && this.searchValue !== '') {
                this.onSearch('');
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
