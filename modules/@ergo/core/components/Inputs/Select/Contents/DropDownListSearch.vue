/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <li
        :class="['search-element', {
            'search-element--small': small,
        }]">
        <TextField
            :value="searchResult"
            :small="small"
            solid
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocused">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
    </li>
</template>

<script>
import { debounce } from 'debounce';
import {
    GREEN, GRAPHITE,
} from '~/assets/scss/_variables/_colors.scss';
import IconSearch from '~/components/Icon/Actions/IconSearch';
import TextField from '@Core/components/Inputs/TextField';

export default {
    name: 'DropDownListSearch',
    components: {
        TextField,
        IconSearch,
    },
    props: {
        small: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    destroyed() {
        delete this.debouncedSearch;
    },
    data() {
        return {
            isSearchFocused: false,
            searchResult: '',
        };
    },
    computed: {
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    methods: {
        onSearch(value) {
            const clearValue = value.startsWith('#') ? value.substring(1) : value;

            this.searchResult = value;
            this.$emit('search', clearValue);
        },
        onSearchFocused(isFocused) {
            this.isSearchFocused = isFocused;
            this.$emit('searchFocused', isFocused);
        },
    },
};
</script>

<style lang="scss">
    .search-element {
        display: flex;
        height: 40px;
        padding: 0 4px;
        box-sizing: border-box;
        cursor: pointer;

        &--small {
            height: 32px;
        }
    }
</style>
