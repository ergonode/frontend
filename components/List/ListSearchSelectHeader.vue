/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
        <Select
            v-show="!isSearchBtnClicked"
            v-model="localSelectedOption"
            class="options-select"
            solid
            :options="options" />
        <TextField
            v-show="isSearchBtnClicked"
            v-model="searchResult"
            class="search-text-field"
            solid
            placeholder="Search..."
            :append-icon="searchStateIcon"
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
            localSelectedOption: '',
            searchResult: '',
        };
    },
    created() {
        this.localSelectedOption = this.selectedOption;
    },
    watch: {
        localSelectedOption() {
            this.$emit('selectOption', this.localSelectedOption);
        },
        searchResult() {
            this.$emit('searchResult', this.searchResult);
        },
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
