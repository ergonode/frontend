/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
        <TextField
            v-show="isSearchBtnClicked"
            :value="searchResult"
            class="search-text-field"
            solid
            placeholder="Search..."
            @input="onSearch"
            @focus="onSearchFocus">
            <template v-slot:append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Button
            class="search-btn"
            fab
            @click.native="onSearchBtnClick">
            <template v-slot:prepend>
                <IconSearch fill-color="#fff" />
            </template>
        </Button>
    </ListHeader>
</template>

<script>
import debounce from 'debounce';
import ListHeader from '~/components/List/ListHeader';
import Button from '~/components/Buttons/Button';
import TextField from '~/components/Inputs/TextField';
import IconSearch from '~/components/Icon/Actions/IconSearch';

export default {
    name: 'ListSearchHeader',
    components: {
        ListHeader,
        TextField,
        Button,
        IconSearch,
    },
    props: {
        header: {
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
        this.debounceFunc = debounce((value) => {
            this.searchResult = value;
            this.$emit('searchResult', value);
        }, 500);
    },
    watch: {
        searchResult() {
            this.$emit('searchResult', this.searchResult);
        },
    },
    computed: {
        searchIconFillColor() {
            return this.isSearchFocused
                ? '#00bc87'
                : '#5c5f65';
        },
    },
    methods: {
        onSearch(value) {
            this.debounceFunc(value);
        },
        onSearchBtnClick() {
            this.isSearchBtnClicked = !this.isSearchBtnClicked;
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

    .search-btn {
        grid-column: 2;
        grid-row: 1;
        justify-self: end;
    }
</style>
