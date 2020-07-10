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
            const gridParams = {
                offset: 0,
                limit: DATA_LIMIT,
                extended: true,
                columns: this.getGridColumnParams(),
            };
            const mappedPath = this.getPath();
            const requests = [
                getGridData({
                    $axios: this.$axios,
                    path: `${this.languageCode}/${mappedPath}`,
                    params: gridParams,
                }),
            ];
            const advFiltersIds = this.$cookies.get(`GRID_ADV_FILTERS_CONFIG:${this.$route.name}`);

            if (advFiltersIds) {
                const filtersParams = {
                    offset: 0,
                    limit: 0,
                    columns: advFiltersIds,
                };

                requests.push(getAdvancedFiltersData({
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: `${this.languageCode}/${mappedPath}`,
                    params: filtersParams,
                }));
            }

            const [
                gridData,
                advancedFilters = [],
            ] = await Promise.all(requests);
            const {
                columns, data, filtered,
            } = gridData;

            this.setDisabledElements(this.getDisabledElements({
                columns,
                filters: advancedFilters,
            }));

            this.columns = columns;
            this.data = data;
            this.filtered = filtered;
            this.advancedFilters = advancedFilters;
            this.isPrefetchingData = false;
        },
        data() {
            return {
                isPrefetchingData: true,
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
                    const column = this.columns.find(({
                        id,
                    }) => id === columnId);

                    if (column && column.element_id) {
                        this.setDisabledElement(this.getDisableListElement({
                            languageCode: column.language,
                            attributeId: column.element_id,
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
                    this.setDisabledElement(this.getDisableListElement({
                        languageCode: filter.languageCode,
                        attributeId: filter.attributeId,
                    }));
                }

                this.advancedFilters = advancedFilters;
            },
            getDisableListElement({
                languageCode, attributeId,
            }) {
                return {
                    languageCode,
                    elementId: attributeId,
                    disabled: this.disabledElements[languageCode]
                        && typeof this.disabledElements[languageCode][attributeId] !== 'undefined',
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

                columns.forEach((column) => {
                    const {
                        element_id: attributeId,
                        language: languageCode,
                    } = column;
                    const {
                        disabled,
                    } = this.getDisableListElement({
                        languageCode,
                        attributeId,
                    });

                    if (typeof disabledElements[languageCode] === 'undefined') {
                        disabledElements[languageCode] = {};
                    }

                    disabledElements[languageCode][attributeId] = disabled;
                });

                filters.forEach((filter) => {
                    const {
                        attributeId,
                        languageCode,
                    } = filter;
                    const {
                        disabled,
                    } = this.getDisableListElement({
                        languageCode,
                        attributeId,
                    });

                    if (typeof disabledElements[languageCode] === 'undefined') {
                        disabledElements[languageCode] = {};
                    }

                    disabledElements[languageCode][attributeId] = disabled;
                });

                return disabledElements;
            },
        },
    };
}
