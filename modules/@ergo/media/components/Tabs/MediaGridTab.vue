/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :is-editable="$hasAccess(['MULTIMEDIA_UPDATE'])"
        :columns="columnsWithAttached"
        :data-count="filtered"
        :data="dataWithAttached"
        :collection-cell-binding="collectionCellBinding"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-header-visible="true"
        :is-collection-layout="true"
        @editRow="onEditRow"
        @removeRow="onRemoveRow"
        @fetchData="getGridData">
        <!--  TODO: Uncomment when we have global search      -->
        <!--        <template #actions>-->
        <!--            <TextField-->
        <!--                :value="searchResult"-->
        <!--                :size="smallSize"-->
        <!--                placeholder="Search..."-->
        <!--                @input="debouncedSearch"-->
        <!--                @focus="onSearchFocus">-->
        <!--                <template #append>-->
        <!--                    <IconSearch :fill-color="searchIconFillColor" />-->
        <!--                </template>-->
        <!--            </TextField>-->
        <!--        </template>-->
        <template #appendFooter>
            <Button
                title="SAVE MEDIA"
                :size="smallSize"
                @click.native="onSaveMedia" />
        </template>
    </Grid>
</template>

<script>
import {
    GRAPHITE,
    GREEN,
} from '@Core/assets/scss/_js-variables/colors.scss';
import Button from '@Core/components/Buttons/Button';
import Grid from '@Core/components/Grid/Grid';
// TODO: Uncomment when we have global search
// import IconSearch from '@Core/components/Icons/Actions/IconSearch';
// import TextField from '@Core/components/Inputs/TextField';
import {
    SIZE,
} from '@Core/defaults/theme';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
    debounce,
} from 'debounce';
import {
    mapActions,
    mapState,
} from 'vuex';

export default {
    name: 'MediaGridTab',
    components: {
        Grid,
        Button,
        // TODO: Uncomment when we have global search
        // TextField,
        // IconSearch,
    },
    mixins: [
        fetchGridDataMixin({
            path: 'multimedia',
        }),
    ],
    props: {
        multiple: {
            type: Boolean,
            default: false,
        },
        value: {
            type: [
                String,
                Array,
            ],
            default: '',
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
        ...mapState('grid', {
            drafts: state => state.drafts,
        }),
        smallSize() {
            return SIZE.SMALL;
        },
        searchIconFillColor() {
            return this.isSearchFocused
                ? GREEN
                : GRAPHITE;
        },
        collectionCellBinding() {
            return {
                imageColumn: 'image',
                descriptionColumn: 'name',
            };
        },
        columnsWithAttached() {
            return [
                ...this.columns,
                {
                    id: 'esa_attached',
                    type: 'ATTACH',
                    label: 'Attached',
                    multiple: this.multiple,
                    visible: true,
                    editable: true,
                    deletable: false,
                    parameters: [],
                    data: this.value,
                },
            ];
        },
        dataWithAttached() {
            if (!this.data.id) {
                return {};
            }

            const tmpData = {
                ...this.data,
                esa_attached: [],
            };

            for (let j = 0; j < this.data.id.length; j += 1) {
                tmpData.esa_attached[j] = {
                    value: Array.isArray(this.value)
                        ? this.value.some(id => id === this.data.id[j])
                        : this.value === this.data.id[j],
                };
            }

            return tmpData;
        },
    },
    mounted() {
        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.getGridData(this.localParams);
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
    },
    methods: {
        ...mapActions('grid', [
            'removeDrafts',
        ]),
        onSaveMedia() {
            const value = [];

            Object.keys(this.drafts).forEach((key) => {
                if (this.drafts[key].esa_attached) {
                    value.push(key);
                }
            });

            this.removeDrafts();

            this.$emit('input', this.multiple ? value : value.join(''));
        },
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
