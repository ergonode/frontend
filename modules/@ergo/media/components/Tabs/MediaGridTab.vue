/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :is-editable="$hasAccess(['MULTIMEDIA_UPDATE'])"
        :columns="columns"
        :data-count="filtered"
        :data="data"
        :is-basic-filter="true"
        :is-header-visible="true"
        :is-collection-layout="true"
        @editRow="onEditRow"
        @removeRow="onRemoveRow"
        @fetchData="getGridData">
        <template #actions>
            <TextField
                :value="searchResult"
                small
                placeholder="Search..."
                @input="debouncedSearch"
                @focus="onSearchFocus">
                <template #append>
                    <IconSearch :fill-color="searchIconFillColor" />
                </template>
            </TextField>
        </template>
    </Grid>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Grid from '@Core/components/Grid/Grid';
import IconSearch from '@Core/components/Icons/Actions/IconSearch';
import TextField from '@Core/components/Inputs/TextField';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
    debounce,
} from 'debounce';

export default {
    name: 'MediaGridTab',
    components: {
        Grid,
        TextField,
        IconSearch,
    },
    // TODO: URL path
    mixins: [
        fetchGridDataMixin({
            path: 'products',
        }),
    ],
    props: {
        // TODO: When allow for selection more rows
        multiple: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            searchResult: null,
            isSearchFocused: false,
            observer: null,
        };
    },
    computed: {
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // TODO: Fetch Grid data - we might also add check if there is anything new uploaded
            }
        });

        this.observer.observe(this.$el);
    },
    created() {
        this.debouncedSearch = debounce(this.onSearch, 500);
    },
    beforeDestroy() {
        delete this.debouncedSearch;
        this.observer.disconnect();
        // TODO: Send back selected files
        this.$emit('input', this.multiple ? [
        ] : 123124);
    },
    methods: {
        onSearchFocus(isFocused) {
            this.isSearchFocused = isFocused;
        },
        onSearch(value) {
            this.searchResult = value;
        },
        onEditRow(args) {
            const lastIndex = args.length - 1;

            this.$router.push({
                name: 'multimedia-id-general',
                params: {
                    id: args[lastIndex],
                },
            });
        },
    },
};
</script>
