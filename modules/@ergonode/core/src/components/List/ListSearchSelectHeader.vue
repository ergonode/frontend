/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
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
            :value="searchResult"
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
    GRAPHITE,
    GREEN,
    WHITE,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Fab from '@Core/components/Fab/Fab';
import IconSearch from '@Core/components/Icons/Actions/IconSearch';
import Select from '@Core/components/Inputs/Select/Select';
import TextField from '@Core/components/Inputs/TextField';
import ListHeader from '@Core/components/List/ListHeader';
import {
    SIZE,
} from '@Core/defaults/theme';
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
        header: {
            type: String,
            required: true,
        },
        options: {
            type: Array,
            default: () => ([]),
        },
        selectedOption: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isSearchButtonClicked: false,
            isSearchFocused: false,
            searchResult: null,
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
            this.$emit('search-result', value);
        },
        onLanguageSelect(value) {
            this.$emit('select-option', value);
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
    .search-button {
        grid-column: 2;
        grid-row: 2;
    }
</style>
