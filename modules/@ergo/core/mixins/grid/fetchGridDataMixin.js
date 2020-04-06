/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { mapState, mapActions } from 'vuex';
import { insertCookieAtIndex } from '@Core/models/cookies';
import { getGridData, getAdvancedFiltersData } from '@Core/services/grid/getGridData.service';
import { DATA_LIMIT } from '@Core/defaults/grid';
import { getParsedFilters, getParsedAdvancedFilters } from '@Core/models/mappers/gridDataMapper';
import { swapItemPosition, insertValueAtIndex } from '@Core/models/arrayWrapper';
import { COLUMNS_IDS, ADV_FILTERS_IDS } from '@Core/defaults/grid/cookies';

export default function ({ path }) {
    return {
        props: {
            isFetchingNeeded: {
                type: Boolean,
                default: false,
            },
        },
        async asyncData({ app, store, params }) {
            const gridParams = {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
            };
            const isProductsRequest = path === 'products';
            let dynamicPath = path;

            Object.keys(params).forEach((key) => {
                if (path.includes(key)) {
                    dynamicPath = dynamicPath.replace(`_${key}`, params[key]);
                }
            });

            if (isProductsRequest) {
                gridParams.columns = app.$cookies.get(COLUMNS_IDS) || '';
            }

            const requests = [
                getGridData(
                    app.$axios,
                    app.$cookies,
                    `${store.state.authentication.user.language}/${dynamicPath}`,
                    gridParams,
                ),
            ];

            const advFiltersIds = app.$cookies.get(ADV_FILTERS_IDS);

            if (advFiltersIds && isProductsRequest) {
                const filtersParams = {
                    offset: 0,
                    limit: advFiltersIds.split(',').length,
                    columns: advFiltersIds,
                };

                requests.push(getAdvancedFiltersData(
                    app.$axios,
                    `${store.state.authentication.user.language}/${dynamicPath}`,
                    filtersParams,
                ));
            }

            const [gridData, advancedFilters = []] = await Promise.all(requests);
            const { columns } = gridData;
            const disabledElements = {};
            const setDisabledElement = ({ languageCode, attributeId }) => {
                if (attributeId) {
                    if (disabledElements[languageCode]
                        && typeof disabledElements[languageCode][attributeId] !== 'undefined') {
                        disabledElements[languageCode] = {
                            ...disabledElements[languageCode],
                            [attributeId]: true,
                        };
                    } else {
                        disabledElements[languageCode] = {
                            ...disabledElements[languageCode],
                            [attributeId]: false,
                        };
                    }
                }
            };
            columns.forEach((column) => {
                const { element_id: attributeId, language: languageCode } = column;
                setDisabledElement({ languageCode, attributeId });
            });

            advancedFilters.forEach((filter) => {
                const { attributeId, languageCode } = filter;
                setDisabledElement({ languageCode, attributeId });
            });

            store.dispatch('list/setDisabledElements', disabledElements);

            return {
                ...gridData,
                advancedFilters,
            };
        },
        data() {
            return {
                advancedFilters: [],
                localParams: {
                    offset: 0, limit: DATA_LIMIT, filters: {}, sortedColumn: {},
                },
            };
        },
        computed: {
            ...mapState('authentication', {
                languageCode: state => state.user.language,
            }),
            ...mapState('list', {
                disabledElements: state => state.disabledElements,
            }),
        },
        watch: {
            isFetchingNeeded() {
                if (this.isFetchingNeeded) {
                    this.getGridData(this.localParams);
                }
            },
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
                'setDisabledElements',
            ]),
            async getGridData({
                offset, limit, filters, sortedColumn,
            }) {
                const parsedFilter = getParsedFilters(filters, this.advancedFilters);
                const parsedAdvancedFilter = getParsedAdvancedFilters(this.advancedFilters);

                this.localParams = {
                    offset, limit, filters, sortedColumn,
                };
                let filter = parsedFilter;

                if (parsedFilter && parsedAdvancedFilter) {
                    filter = `${parsedFilter};${parsedAdvancedFilter}`;
                } else if (parsedAdvancedFilter) {
                    filter = parsedAdvancedFilter;
                }

                const isProductsRequest = path === 'products';
                const params = {
                    offset,
                    limit,
                    extended: true,
                    filter,
                };

                if (isProductsRequest) {
                    params.columns = this.$cookies.get(COLUMNS_IDS);
                }

                if (Object.keys(sortedColumn).length) {
                    const { index: colSortID, orderState } = sortedColumn;

                    params.field = colSortID;
                    params.order = orderState;
                }

                let dynamicPath = path;

                Object.keys(this.$route.params).forEach((key) => {
                    if (path.includes(key)) {
                        dynamicPath = dynamicPath.replace(`_${key}`, this.$route.params[key]);
                    }
                });

                const {
                    columns,
                    rowIds,
                    rowLinks,
                    cellValues,
                    count,
                    filtered,
                } = await getGridData(
                    this.$axios,
                    this.$cookies,
                    `${this.languageCode}/${dynamicPath}`,
                    params,
                );

                this.columns = columns;
                this.rowIds = rowIds;
                this.rowLinks = rowLinks;
                this.cellValues = cellValues;
                this.count = count;
                this.filtered = filtered;

                this.$emit('fetched');
            },
            removeRowAtIndex(index) {
                this.rowIds.splice(index, 1);
                this.rowLinks.splice(index, 1);
                this.count -= 1;
                this.filtered -= 1;
            },
            removeColumnAtIndex(index) {
                this.columns.splice(index, 1);
            },
            insertColumnAtIndex({ index, column }) {
                this.columns = insertValueAtIndex([...this.columns], column, index);
            },
            dropColumnAtIndex({ columnId, ghostIndex }) {
                const columnIds = insertValueAtIndex(
                    this.$cookies.get(COLUMNS_IDS).split(','),
                    columnId,
                    ghostIndex,
                );
                this.$cookies.set(COLUMNS_IDS, columnIds.join(','));

                this.getGridData(this.localParams).then(() => {
                    const column = this.columns.find(({ id }) => id === columnId);

                    if (column && column.element_id) {
                        this.setDisabledElement({
                            languageCode: column.language,
                            elementId: column.element_id,
                            disabled: false,
                        });
                    }
                });
            },
            swapColumnsPosition({ from, to }) {
                this.columns = [
                    ...swapItemPosition(this.columns, from, to),
                ];

                this.$cookies.set(COLUMNS_IDS, this.columns.map(column => column.id).join(','));
            },
            dropFilterAtIndex({ data, index }) {
                try {
                    const filter = JSON.parse(data);

                    this.updateFilterAtIndex({
                        index,
                        filter,
                    });
                } catch (e) {
                    const [code, languageCode] = data.split(':');

                    this.getAttributeFilter({
                        index,
                        languageCode,
                        code,
                    });
                }
            },
            insertFilterAtIndex({ index, filter }) {
                this.advancedFilters = insertValueAtIndex([...this.advancedFilters], filter, index);
            },
            swapFiltersPosition({ from, to }) {
                this.advancedFilters = [
                    ...swapItemPosition(this.advancedFilters, from, to),
                ];
            },
            removeFilterAtIndex(index) {
                this.advancedFilters.splice(index, 1);
            },
            removeAllFilters() {
                this.advancedFilters.forEach(({ attributeId, languageCode }) => {
                    this.setDisabledElement({
                        languageCode, elementId: attributeId, disabled: false,
                    });
                });

                this.advancedFilters = [];
                this.$cookies.remove(ADV_FILTERS_IDS);
            },
            setGhostFilterAtIndex({ index, isGhost }) {
                this.advancedFilters[index].isGhost = isGhost;
                this.advancedFilters = [...this.advancedFilters];
            },
            clearAllFilters() {
                const { length } = this.advancedFilters;

                for (let i = 0; i < length; i += 1) {
                    this.advancedFilters[i].value = {
                        isEmptyRecord: false,
                    };
                }
            },
            clearFilterAtIndex(index) {
                this.advancedFilters[index].value = {
                    isEmptyRecord: false,
                };
            },
            updateFilterAtIndex({ index, filter }) {
                this.advancedFilters[index] = filter;
                this.advancedFilters = [...this.advancedFilters];
            },
            updateFilterValueAtIndex({ index, key, value }) {
                this.advancedFilters[index].value = {
                    ...this.advancedFilters[index].value,
                    [key]: value,
                };
            },
            getAttributeFilter({ index, languageCode, code }) {
                const attributeCode = `${code}:${languageCode}`;
                const params = {
                    limit: 1,
                    offset: 0,
                    columns: attributeCode,
                };

                return this.$axios.$get(`${languageCode}/${path}`, { params })
                    .then(({ columns }) => {
                        const [attribute] = columns;
                        const options = attribute.filter && attribute.filter.options
                            ? Object.keys(attribute.filter.options)
                                .map(key => ({
                                    key,
                                    value: attribute.filter.options[key],
                                }))
                            : [];
                        const filter = {
                            id: attributeCode,
                            attributeId: attribute.element_id || '',
                            languageCode,
                            type: attribute.filter.type,
                            label: attribute.label,
                            parameters: attribute.parameters,
                            options,
                            isGhost: false,
                            value: {
                                isEmptyRecord: false,
                            },
                        };
                        this.insertFilterAtIndex({
                            index,
                            filter,
                        });
                        try {
                            insertCookieAtIndex({
                                cookies: this.$cookies,
                                cookieName: ADV_FILTERS_IDS,
                                index,
                                data: attributeCode,
                            });
                        } catch {
                            this.$cookies.set(ADV_FILTERS_IDS, attributeCode);
                        }

                        this.disableListElement({ languageCode, attributeId: filter.attributeId });
                    });
            },
            disableListElement({ languageCode, attributeId }) {
                if (this.disabledElements[languageCode]
                    && typeof this.disabledElements[languageCode][attributeId] !== 'undefined') {
                    this.setDisabledElement({
                        languageCode, elementId: attributeId, disabled: true,
                    });
                } else {
                    this.setDisabledElement({
                        languageCode, elementId: attributeId, disabled: false,
                    });
                }
            },
        },
    };
}
