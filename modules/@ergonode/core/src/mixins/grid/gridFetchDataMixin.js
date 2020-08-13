/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    DATA_LIMIT,
} from '@Core/defaults/grid';
import {
    getAdvancedFiltersData,
    getGridData,
} from '@Core/services/grid/getGridData.service';
import {
    mapActions,
    mapState,
} from 'vuex';

export default function ({
    path,
}) {
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
            const requests = [
                this.onFetchData({
                    offset: 0,
                    limit: DATA_LIMIT,
                    filters: '',
                    sortedColumn: {},
                }),
            ];
            const advFiltersIds = this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

            if (advFiltersIds) {
                requests.push(this.onFetchAdvancedFilters(advFiltersIds));
            }

            await Promise.all(requests);

            console.log(this.columns, this.advancedFilters);

            this.setDisabledElements(this.getDisabledElements({
                columns: this.columns,
                filters: this.advancedFilters,
            }));

            this.isPrefetchingData = false;
        },
        data() {
            return {
                isPrefetchingData: true,
                rows: [],
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
                    this.onFetchData(this.localParams);
                }
            },
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
                'setDisabledElements',
            ]),
            onFetchAdvancedFilters(ids) {
                const filtersParams = {
                    offset: 0,
                    limit: 0,
                    columns: ids,
                };

                return getAdvancedFiltersData({
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: `${this.languageCode}/${this.getPath()}`,
                    params: filtersParams,
                }).then((advancedFilters) => {
                    this.advancedFilters = advancedFilters;
                });
            },
            onFetchData({
                offset, limit, filters, sortedColumn,
            }) {
                this.localParams = {
                    offset,
                    limit,
                    filters,
                    sortedColumn,
                };

                const params = {
                    offset,
                    limit,
                    extended: true,
                    filter: filters,
                    columns: this.getGridColumnParams(),
                };

                if (Object.keys(sortedColumn).length) {
                    const {
                        index: colSortID, orderState,
                    } = sortedColumn;

                    params.field = colSortID;
                    params.order = orderState;
                }

                return getGridData({
                    $axios: this.$axios,
                    path: `${this.languageCode}/${this.getPath()}`,
                    params,
                }).then(({
                    columns,
                    rows,
                    filtered,
                }) => {
                    this.columns = columns;
                    this.rows = rows;
                    this.filtered = filtered;

                    this.$emit('fetched');
                });
            },
            onRemoveRow() {
                this.onFetchData(this.localParams);
            },
            onDropColumn(columnId) {
                this.onFetchData(this.localParams).then(() => {
                    const column = this.columns.find(({
                        id,
                    }) => id === columnId);

                    if (column && column.element_id) {
                        this.setDisabledElement(this.getDisabledListElement({
                            languageCode: column.language,
                            attributeId: column.element_id,
                            disabledElements: this.disabledElements,
                        }));
                    }
                });
            },
            async onDropFilter(filterId) {
                const params = {
                    limit: 0,
                    offset: 0,
                    columns: this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`),
                };
                const advancedFilters = await getAdvancedFiltersData({
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: `${this.languageCode}/${path}`,
                    params,
                });
                const filter = advancedFilters.find(({
                    id,
                }) => id === filterId);

                if (filter && filter.attributeId) {
                    this.setDisabledElement(this.getDisabledListElement({
                        languageCode: filter.languageCode,
                        attributeId: filter.attributeId,
                        disabledElements: this.disabledElements,
                    }));
                }

                this.advancedFilters = advancedFilters;
            },
            getDisabledListElement({
                languageCode,
                attributeId,
                disabledElements,
            }) {
                return {
                    languageCode,
                    elementId: attributeId,
                    disabled: Boolean(disabledElements[languageCode]
                        && typeof disabledElements[languageCode][attributeId] !== 'undefined'),
                };
            },
            getPath() {
                let mappedPath = path;

                Object.keys(this.$route.params).forEach((key) => {
                    if (path.includes(key)) {
                        mappedPath = mappedPath.replace(`_${key}`, this.$route.params[key]);
                    }
                });

                return mappedPath;
            },
            getGridColumnParams() {
                const columnsConfig = this.$cookies.get(`GRID_CONFIG:${this.$route.name}`);
                let columns = '';

                if (columnsConfig) {
                    columns = `${columnsConfig},_links`;
                } else if (path === 'products') {
                    columns = `index,sku,_links,esa_default_image:${this.languageCode},esa_default_label:${this.languageCode}`;
                }

                return columns;
            },
            getDisabledElements({
                columns, filters,
            }) {
                const disabledElements = {};

                const elements = [
                    ...columns.map(column => ({
                        languageCode: column.language,
                        attributeId: column.element_id,
                    })),
                    ...filters.map(filter => ({
                        languageCode: filter.languageCode,
                        attributeId: filter.attributeId,
                    })),
                ];

                elements.forEach((element) => {
                    const {
                        attributeId,
                        languageCode,
                    } = element;

                    if (attributeId && languageCode) {
                        const {
                            disabled,
                        } = this.getDisabledListElement({
                            languageCode,
                            attributeId,
                            disabledElements,
                        });

                        if (typeof disabledElements[languageCode] === 'undefined') {
                            disabledElements[languageCode] = {};
                        }

                        disabledElements[languageCode][attributeId] = disabled;
                    }
                });

                return disabledElements;
            },
        },
    };
}
