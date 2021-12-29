/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
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
            @input="onSearch"
            @focus="onSearchFocus">
            <template #append>
                <IconSearch :fill-color="searchIconFillColor" />
            </template>
        </TextField>
        <Fab
            v-if="searchable"
            class="search-button"
            :theme="secondaryTheme"
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
    THEME,
} from '@Core/defaults/theme';
import {
    GRAPHITE,
    GREEN,
} from '@UI/assets/scss/_js-variables/colors.scss';
import Fab from '@UI/components/Fab/Fab';
import IconSearch from '@UI/components/Icons/Actions/IconSearch';
import IconClose from '@UI/components/Icons/Window/IconClose';
import ListHeader from '@UI/components/List/ListHeader';
import TextField from '@UI/components/TextField/TextField';

export default {
    name: 'ListSearchHeader',
    components: {
        ListHeader,
        TextField,
        Fab,
        IconSearch,
        IconClose,
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
         * Search value
         */
        searchValue: {
            type: String,
            default: '',
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
        };
    },
    computed: {
        smallSize() {
            return SIZE.SMALL;
        },
        secondaryTheme() {
            return THEME.SECONDARY;
        },
        searchButtonIconComponent() {
            return this.isSearchButtonClicked
                ? IconClose
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
            this.$emit('search', value);
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
