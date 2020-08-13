/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    getAdvancedFiltersData,
} from '@Core/services/grid/getGridData.service';
import {
    mapActions,
    mapState,
} from 'vuex';

export default function ({
    path,
}) {
    return {
        data() {
            return {
                advancedFilters: [],
            };
        },
        computed: {
            ...mapState('authentication', {
                languageCode: state => state.user.language,
            }),
        },
        methods: {
            ...mapActions('list', [
                'setDisabledElement',
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
        },
    };
}
