/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <Grid
        :is-editable="$hasAccess(['MULTIMEDIA_UPDATE'])"
        :columns="columnsWithAttachColumn"
        :data-count="filtered"
        :drafts="drafts"
        :rows="rowsWithAttachValues"
        :collection-cell-binding="collectionCellBinding"
        :is-prefetching-data="isPrefetchingData"
        :is-basic-filter="true"
        :is-header-visible="true"
        :is-collection-layout="true"
        @editRow="onEditRow"
        @cellValue="onCellValueChange"
        @deleteRow="onRemoveRow"
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
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
// TODO: Uncomment when we have global search
// import IconSearch from '@Core/components/Icons/Actions/IconSearch';
// import TextField from '@Core/components/Inputs/TextField';
import {
    SIZE,
} from '@Core/defaults/theme';
import draftGridMixin from '@Core/mixins/grid/draftGridMixin';
import fetchGridDataMixin from '@Core/mixins/grid/fetchGridDataMixin';
import {
    debounce,
} from 'debounce';
import {
    mapActions,
} from 'vuex';

export default {
    name: 'MediaGrid',
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
        draftGridMixin,
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
        columnsWithAttachColumn() {
            return [
                ...this.columns,
                {
                    id: 'esa_attached',
                    type: 'MEDIA_ATTACH',
                    label: 'Attached',
                    visible: true,
                    editable: true,
                    deletable: false,
                    parameters: [],
                },
            ];
        },
        rowsWithAttachValues() {
            const rows = [
                ...this.rows,
            ];

            for (let i = 0; i < this.rows.length; i += 1) {
                rows[i].esa_attached = {
                    value:
                        Array.isArray(this.value)
                            ? this.value.some(id => id === this.rows[i].id.value)
                            : this.value === this.rows[i].id.value,
                };
            }

            return rows;
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
        onCellValueChange({
            rowId, columnId, value,
        }) {
            const drafts = {};

            if (!this.multiple && this.value) {
                if (typeof this.drafts[`${this.value}/${columnId}`] === 'undefined') {
                    drafts[`${this.value}/${columnId}`] = false;
                } else {
                    const lastSelectedDraftKey = Object.keys(this.drafts)
                        .find(key => this.drafts[key]);

                    if (lastSelectedDraftKey !== `${rowId}/${columnId}`) {
                        drafts[lastSelectedDraftKey] = false;
                    }
                }
            }

            drafts[`${rowId}/${columnId}`] = value;

            this.setDrafts(drafts);
        },
        onSaveMedia() {
            const value = [];
            const toRemove = [];

            Object.keys(this.drafts).forEach((key) => {
                const [
                    rowId,
                ] = key.split('/');

                if (this.drafts[key]) {
                    value.push(rowId);
                } else {
                    toRemove.push(rowId);
                }
            });

            this.setDrafts();

            if (this.multiple) {
                const mappedValue = [
                    ...this.value.filter(id => !toRemove.some(removeId => removeId === id)),
                    ...value,
                ];

                this.$emit('input', mappedValue);
            } else {
                this.$emit('input', value.join(''));
            }

            this.$addAlert({
                type: ALERT_TYPE.SUCCESS,
                message: 'Media have been added',
            });

            this.getGridData(this.localParams);
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
