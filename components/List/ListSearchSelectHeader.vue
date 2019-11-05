/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
        <Select
            v-show="!isSearchBtnClicked"
            :value="selectedOption"
            class="options-select"
            solid
            small
            :options="options"
            @input="onLanguageSelect" />
        <TextField
            v-if="isSearchBtnClicked"
            :value="searchResult"
            class="search-text-field"
            solid
            autofocus
            small
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <FabButton
            class="search-btn"
            @click.native="onSearchBtnClick">
            <template #icon="{ color }">
                <Component
                    :is="searchBtnIconComponent"
                    :fill-color="color" />
            </template>
        </FabButton>
    </ListHeader>
</template>

<script>
import { debounce } from 'debounce';
import {
    GREEN, GRAPHITE, WHITE,
} from '~/assets/scss/_variables/_colors.scss';
import ListHeader from '~/components/List/ListHeader';
import FabButton from '~/components/Buttons/FabButton';
import Select from '~/components/Inputs/Select/Select';
import TextField from '~/components/Inputs/TextField';
import IconSearch from '~/components/Icon/Actions/IconSearch';

export default {
    name: 'ListSearchSelectHeader',
    components: {
        ListHeader,
        FabButton,
        Select,
        TextField,
        IconSearch,
    },
    props: {
        header: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        selectedOption: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isSearchBtnClicked: false,
            isSearchFocused: false,
            searchResult: '',
        };
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        searchBtnIconComponent() {
            return this.isSearchBtnClicked
                ? () => import('~/components/Icon/Window/IconClose')
                : IconSearch;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    methods: {
        onSearch(value) {
            this.searchResult = value;
            this.$emit('searchResult', value);
        },
        onLanguageSelect(value) {
            this.$emit('selectOption', value);
        },
        onSearchBtnClick() {
            this.isSearchBtnClicked = !this.isSearchBtnClicked;

            if (!this.isSearchBtnClicked && this.searchResult !== '') {
                this.searchResult = '';
                this.onSearch(this.searchResult);
            }
        },
        onSearchFocus(isFocused) {
            this.isSearchFocused = isFocused;
        },
    },
};
</script>

<style lang="scss" scoped>
    .options-select, .search-text-field {
        grid-column: 1;
        grid-row: 2;
    }

    .search-btn {
        grid-column: 2;
        grid-row: 2;
    }
</style>
