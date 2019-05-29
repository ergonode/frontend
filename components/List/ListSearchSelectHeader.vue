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
            :options="options"
            @input="onLanguageSelect" />
        <TextField
            v-show="isSearchBtnClicked"
            :value="searchResult"
            class="search-text-field"
            solid
            placeholder="Search..."
            :append-icon="searchStateIcon"
            @input="onSearch"
            @focus="onSearchFocus" />
        <Button
            class="search-btn"
            :icon="searchBtnIcon"
            fab
            @click.native="onSearchBtnClick" />
    </ListHeader>
</template>

<script>
import ListHeader from '~/components/List/ListHeader';
import Button from '~/components/Buttons/Button';
import Select from '~/components/Inputs/Select/Select';
import TextField from '~/components/Inputs/TextField';
import debounce from 'debounce';

export default {
    name: 'ListSearchSelectHeader',
    components: {
        ListHeader,
        Button,
        Select,
        TextField,
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
        this.debounceFunc = debounce((value) => {
            this.searchResult = value;
            this.$emit('searchResult', value);
        }, 500);
    },
    computed: {
        searchBtnIcon() {
            return this.isSearchBtnClicked
                ? 'sprite-system system-remove--active'
                : 'sprite-system system-search--active';
        },
        searchStateIcon() {
            return this.isSearchFocused
                ? 'sprite-system system-search--selected'
                : 'sprite-system system-search--deactive';
        },
    },
    methods: {
        onSearch(value) {
            this.debounceFunc(value);
        },
        onLanguageSelect(value) {
            this.$emit('selectOption', value);
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
    .options-select, .search-text-field {
        grid-column: 1;
        grid-row: 2;
    }

    .search-btn {
        grid-column: 2;
        grid-row: 2;
    }
</style>
