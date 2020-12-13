/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    DATA_LIMIT,
    DEFAULT_GRID_FETCH_PARAMS,
    DEFAULT_PAGE,
} from '@Core/defaults/grid';
import {
    changeCookiePosition,
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getMappedFilters,
    getParsedFilters,
} from '@Core/models/mappers/gridDataMapper';
import {
    getGridData,
} from '@Core/services/grid/getGridData.service';
import Grid from '@UI/components/Grid/Grid';
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
        data() {
            const {
                query: {
                    page = DEFAULT_PAGE,
                    itemsPerPage = DATA_LIMIT,
                    filter = '',
                },
            } = this.$route;

            return {
                rows: [],
                columns: [],
                filterValues: getMappedFilters(filter),
                filtered: 0,
                localParams: DEFAULT_GRID_FETCH_PARAMS(),
                pagination: {
                    page: +page,
                    itemsPerPage: +itemsPerPage,
                },
            };
        },
        computed: {
            ...mapState('authentication', {
                userLanguageCode: state => state.user.language,
            }),
            ...mapState('list', [
                'disabledElements',
            ]),
        },
        watch: {
            $route() {
                console.log('changed route');
                this.onFetchData();
            },
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
                'removeDisabledElement',
            ]),
            onPaginationChange(pagination) {
                this.pagination = pagination;

                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        ...pagination,
                    },
                });
            },
            onRemoveAllFilters() {
                this.filterValues = {};
                this.pagination.page = 1;
                this.localParams.filter = {};

                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        ...this.pagination,
                    },
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
                        language: languageCode = this.userLanguageCode,
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
                this.pagination.page = 1;

                this.$router.replace({
                    query: {
                        ...this.$route.query,
                        ...this.pagination,
                        filter: getParsedFilters(filters),
                    },
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
            onColumnSortChange(sortOrder) {
                this.localParams.sortOrder = sortOrder;

                this.onFetchData();
            },
            async onFetchData() {
                await getGridData({
                    $route: this.$route,
                    $cookies: this.$cookies,
                    $axios: this.$axios,
                    path: this.getPath(),
                    params: this.getParams(),
                    onSuccess: this.onFetchDataSuccess,
                    onError: this.onFetchDataError,
                });
            },
            onFetchDataSuccess({
                columns,
                rows,
                filtered,
            }) {
                this.columns = columns;
                this.rows = rows;
                this.filtered = filtered;

                this.$emit('fetched');
            },
            onFetchDataError() {
                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'Grid data haven’t been fetched properly',
                });
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
            getParams() {
                const {
                    query: {
                        page = DEFAULT_PAGE,
                        itemsPerPage = DATA_LIMIT,
                        filter = '',
                    },
                } = this.$route;

                const params = {
                    offset: (page - 1) * itemsPerPage,
                    limit: itemsPerPage,
                    extended: true,
                    filter,
                    columns: this.$cookies.get(`GRID_CONFIG:${this.$route.name}`) || defaultColumns,
                };

                if (Object.keys(this.localParams.sortOrder).length) {
                    const {
                        index: colSortID,
                        orderState,
                    } = this.localParams.sortOrder;

                    params.field = colSortID;
                    params.order = orderState;
                }

                return params;
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
        },
    };
}
