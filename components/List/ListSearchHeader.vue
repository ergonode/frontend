/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <ListHeader :header="header">
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
import TextField from '~/components/Inputs/TextField';

export default {
    name: 'ListSearchHeader',
    components: {
        ListHeader,
        TextField,
        Button,
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
    watch: {
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
