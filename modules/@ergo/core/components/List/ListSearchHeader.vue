/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
        <TextField
            v-show="isSearchButtonClicked"
            :value="searchResult"
            class="search-text-field"
            solid
            small
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            v-if="isSearch"
            class="search-button"
            @click.native="onSearchButtonClick">
            <template #icon="{ fillColor }">
                <Component
                    :is="searchButtonIconComponent"
                    :fill-color="fillColor" />
            </template>
        </Fab>
    </ListHeader>
</template>

<script>
import { debounce } from 'debounce';
import {
    GREEN, GRAPHITE, WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import ListHeader from '@Core/components/List/ListHeader';
import Fab from '@Core/components/Buttons/Fab';
import TextField from '@Core/components/Inputs/TextField';
import IconSearch from '@Core/components/Icons/Actions/IconSearch';

export default {
    name: 'ListSearchHeader',
    components: {
        ListHeader,
        TextField,
        Fab,
        IconSearch,
    },
    props: {
        header: {
            type: String,
            required: true,
        },
        isSearch: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isSearchButtonClicked: false,
            isSearchFocused: false,
            searchResult: '',
        };
    },
    computed: {
        whiteColor() {
            return WHITE;
        },
        searchButtonIconComponent() {
            return this.isSearchButtonClicked
                ? () => import('@Core/components/Icons/Window/IconClose')
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
            this.searchResult = value;
            this.$emit('searchResult', value);
        },
        onSearchButtonClick() {
            this.isSearchButtonClicked = !this.isSearchButtonClicked;

            if (!this.isSearchButtonClicked && this.searchResult !== '') {
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
    .search-text-field {
        grid-column: 1 / 3;
        grid-row: 2;
    }

    .search-button {
        grid-column: 2;
        grid-row: 1;
        justify-self: end;
    }
</style>
