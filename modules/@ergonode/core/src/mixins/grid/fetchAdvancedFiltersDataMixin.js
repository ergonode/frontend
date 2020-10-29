/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import ExpandNumericButton from '@Core/components/Buttons/ExpandNumericButton';
import {
    insertCookieAtIndex,
    removeCookieAtIndex,
} from '@Core/models/cookies';
import {
    getAdvancedFiltersData,
} from '@Core/services/grid/getGridData.service';
import GridAdvancedFilters from '@UI/components/Grid/AdvancedFilters/GridAdvancedFilters';
import {
    mapActions,
} from 'vuex';

export default function ({
    path,
}) {
    return {
        components: {
            ExpandNumericButton,
            GridAdvancedFilters,
        },
        data() {
            return {
                isFiltersExpanded: false,
                advancedFilters: [],
                advancedFilterValues: {},
            };
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
            ]),
            onFiltersExpand() {
                this.isFiltersExpanded = !this.isFiltersExpanded;
            },
            async onFetchAdvancedFilters(ids) {
                const filtersParams = {
                    offset: 0,
                    limit: 0,
                    columns: ids,
                };

                this.advancedFilters = await getAdvancedFiltersData({
                    $route: this.$route,
                    $cookies: this.$cookies,
                    $axios: this.$axios,
                    $addAlert: this.$addAlert,
                    path: this.getPath(),
                    params: filtersParams,
                });
            },
            async onDropFilter(payload) {
                try {
                    const filterCode = payload.split('/')[1];
                    const params = {
                        limit: 0,
                        offset: 0,
                        columns: filterCode,
                    };

                    insertCookieAtIndex({
                        cookies: this.$cookies,
                        cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                        index: 0,
                        data: filterCode,
                    });

                    const advancedFilters = await getAdvancedFiltersData({
                        $route: this.$route,
                        $cookies: this.$cookies,
                        $axios: this.$axios,
                        $addAlert: this.$addAlert,
                        path,
                        params,
                    });

                    if (advancedFilters.length) {
                        const filter = advancedFilters.find(({
                            id,
                        }) => id === filterCode);

                        if (filter.attributeId) {
                            this.setDisabledElement(this.getDisabledListElement({
                                languageCode: filter.languageCode,
                                attributeId: filter.attributeId,
                                disabledElements: this.disabledElements,
                            }));
                        }

                        this.advancedFilters.unshift(filter);
                    } else {
                        removeCookieAtIndex({
                            cookies: this.$cookies,
                            cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
                            index: 0,
                        });
                    }
                } catch {
                    removeCookieAtIndex({
                        cookies: this.$cookies,
                        cookieName: `GRID_ADV_FILTERS_CONFIG:${this.$route.name}`,
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
        },
    };
}
