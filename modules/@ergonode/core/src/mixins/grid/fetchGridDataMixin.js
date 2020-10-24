/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import Grid from '@Core/components/Grid/Grid';
import {
    DEFAULT_GRID_FETCH_PARAMS,
} from '@Core/defaults/grid';
import {
    changeCookiePosition,
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import {
    mapActions,
    mapState,
} from 'vuex';

export default function ({
    path,
    defaultColumns = '',
}) {
    return {
        components: {
            Grid,
        },
        props: {
            isFetchingNeeded: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                rows: [],
                columns: [],
                filterValues: {},
                filtered: 0,
                localParams: DEFAULT_GRID_FETCH_PARAMS,
            };
        },
        computed: {
            ...mapState('list', [
                'disabledElements',
            ]),
        },
        watch: {
            isFetchingNeeded() {
                if (this.isFetchingNeeded) {
                    this.onFetchData();
                }
            },
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
                'removeDisabledElement',
            ]),
            onRemoveAllFilters() {
                this.filterValues = {};

                this.onFetchData({
                    ...this.localParams,
                    filter: {},
                });
            },
            onRemoveColumn({
                index,
                column,
            }) {
                const {
                    id,
                } = column;

                if (column.element_id) {
                    const {
                        language: languageCode,
                        element_id: elementId,
                    } = column;

                    if (this.disabledElements[languageCode][elementId]) {
                        this.setDisabledElement({
                            languageCode,
                            elementId,
                            disabled: false,
                        });
                    } else {
                        this.removeDisabledElement({
                            languageCode,
                            elementId,
                        });
                    }
                }

                delete this.filterValues[id];
                delete this.localParams.filter[id];

                removeCookieAtIndex({
                    cookies: this.$cookies,
                    cookieName: `GRID_CONFIG:${this.$route.name}`,
                    index,
                });

                this.onFetchData();
            },
            onFilterChange(filters) {
                this.filterValues = filters;

                this.onFetchData({
                    ...this.localParams,
                    filter: this.filterValues,
                });
            },
            onSwapColumns({
                from,
                to,
            }) {
                changeCookiePosition({
                    cookies: this.$cookies,
                    cookieName: `GRID_CONFIG:${this.$route.name}`,
                    from,
                    to,
                });
            },
            async onFetchData({
                offset,
                limit,
                filter,
                sortedColumn,
            } = this.localParams) {
                this.localParams = {
                    offset,
                    limit,
                    filter,
                    sortedColumn,
                };

                const params = {
                    offset,
                    limit,
                    extended: true,
                    filter,
                    columns: this.getGridColumnParams(),
                };

                if (Object.keys(sortedColumn).length) {
                    const {
                        index: colSortID, orderState,
                    } = sortedColumn;

                    params.field = colSortID;
                    params.order = orderState;
                }

                const {
                    columns,
                    rows,
                    filtered,
                } = await getGridData({
                    $route: this.$route,
                    $cookies: this.$cookies,
                    $axios: this.$axios,
                    path: this.getPath(),
                    params,
                });

                this.columns = columns;
                this.rows = rows;
                this.filtered = filtered;

                this.$emit('fetched');
            },
            onRemoveRow() {
                this.onFetchData();
            },
            async onDropColumn(payload) {
                try {
                    const columnCode = payload.split('/')[1];

                    insertCookieAtIndex({
                        cookies: this.$cookies,
                        cookieName: `GRID_CONFIG:${this.$route.name}`,
                        index: 0,
                        data: columnCode,
                    });

                    await this.onFetchData();

                    const column = this.columns.find(({
                        id,
                    }) => id === columnCode);

                    if (column && column.element_id) {
                        this.setDisabledElement(this.getDisabledListElement({
                            languageCode: column.language,
                            attributeId: column.element_id,
                            disabledElements: this.disabledElements,
                        }));
                    }
                } catch {
                    removeCookieAtIndex({
                        cookies: this.$cookies,
                        cookieName: `GRID_CONFIG:${this.$route.name}`,
                        index: 0,
                    });
                }
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

                return columnsConfig || defaultColumns;
            },
        },
    };
}
