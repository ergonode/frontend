/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :title="title">
        <TextField
            v-show="isSearchButtonClicked"
            :value="searchValue"
            class="search-text-field"
            :size="smallSize"
            placeholder="Search..."
            @input="debouncedSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            v-if="searchable"
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
import TextField from '@UI/components/TextField/TextField';
import {
    debounce,
} from 'debounce';

export default {
    name: 'ListSearchHeader',
    components: {
        ListHeader,
        TextField,
        Fab,
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
         * Determines if the component has possibility of search for value
         */
        searchable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isSearchButtonClicked: false,
            isSearchFocused: false,
            searchValue: '',
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
