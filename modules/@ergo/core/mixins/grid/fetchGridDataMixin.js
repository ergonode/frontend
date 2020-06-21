/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { DATA_LIMIT } from '@Core/defaults/grid';
import { ADV_FILTERS_IDS } from '@Core/defaults/grid/cookies';
import { insertValueAtIndex, swapItemPosition } from '@Core/models/arrayWrapper';
import { insertCookieAtIndex } from '@Core/models/cookies';
import { getParsedAdvancedFilters, getParsedFilters } from '@Core/models/mappers/gridDataMapper';
import { getAdvancedFiltersData, getGridData } from '@Core/services/grid/getGridData.service';
import { mapActions, mapState } from 'vuex';

export default function ({ path }) {
    return {
        components: {
            Grid: () => import('@Core/components/Grid/Grid'),
        },
        props: {
            isFetchingNeeded: {
                type: Boolean,
                default: false,
            },
        },
        async fetch() {
            const gridParams = {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
            };

            const columnsConfig = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);

            if (columnsConfig) {
                gridParams.columns = `${columnsConfig},_links`;
            }

            let dynamicPath = path;

            Object.keys(this.$route.params).forEach((key) => {
                if (path.includes(key)) {
                    dynamicPath = dynamicPath.replace(`_${key}`, this.$route.params[key]);
                }
            });

            const requests = [
                getGridData({
                    $axios: this.$axios,
                    path: `${this.$store.state.authentication.user.language}/${dynamicPath}`,
                    params: gridParams,
                }),
            ];

            const advFiltersIds = this.$cookies.get(ADV_FILTERS_IDS);

            if (advFiltersIds && path === 'products') {
                const filtersParams = {
                    offset: 0,
                    limit: advFiltersIds.split(',').length,
                    columns: advFiltersIds,
                };

                requests.push(getAdvancedFiltersData({
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: `${this.$store.state.authentication.user.language}/${dynamicPath}`,
                    params: filtersParams,
                }));
            }

            const [gridData, advancedFilters = []] = await Promise.all(requests);
            const { columns, data, filtered } = gridData;
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

            this.setDisabledElements(disabledElements);

            this.columns = columns;
            this.data = data;
            this.filtered = filtered;
            this.advancedFilters = advancedFilters;
        },
        data() {
            return {
                data: {},
                columns: [],
                filtered: 0,
                advancedFilters: [],
                localParams: {
                    offset: 0,
                    limit: DATA_LIMIT,
                    filters: {},
                    sortedColumn: {},
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
            getGridData({
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

                const params = {
                    offset,
                    limit,
                    extended: true,
                    filter,
                    columns: `${this.$cookies.get(`GRID_CONFIG:${this.$route.name}`)},_links`,
                };

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

                return getGridData({
                    $axios: this.$axios,
                    path: `${this.languageCode}/${dynamicPath}`,
                    params,
                }).then(({
                    columns,
                    data,
                    filtered,
                }) => {
                    this.columns = columns;
                    this.data = data;
                    this.filtered = filtered;

                    this.$emit('fetched');
                });
            },
            onRemoveRow() {
                this.getGridData(this.localParams);
            },
            onDropColumn(columnId) {
                this.getGridData(this.localParams).then(() => {
                    const column = this.columns.find(({ id }) => id === columnId);

                    if (column && column.element_id) {
                        this.disableListElement({
                            languageCode: column.language,
                            attributeId: column.element_id,
                        });
                    }
                });
            },
            dropFilter(data) {
                const [code, languageCode] = data.split(':');

                this.getAttributeFilter({
                    languageCode,
                    code,
                });
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
            async getAttributeFilter({ languageCode, code }) {
                const index = 0;
                const attributeCode = `${code}:${languageCode}`;
                const params = {
                    limit: 1,
                    offset: 0,
                    columns: attributeCode,
                };

                const advancedFilters = await getAdvancedFiltersData({
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: `${languageCode}/${path}`,
                    params,
                });

                const [advancedFilter] = advancedFilters;

                if (advancedFilter) {
                    this.advancedFilters = insertValueAtIndex(
                        [...this.advancedFilters],
                        advancedFilter,
                        index,
                    );

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

                    this.disableListElement({
                        languageCode,
                        attributeId: advancedFilter.attributeId,
                    });
                }
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
