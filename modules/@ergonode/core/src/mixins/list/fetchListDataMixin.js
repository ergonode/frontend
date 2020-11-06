/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    ALERT_TYPE,
} from '@Core/defaults/alerts';
import {
    getListItems,
} from '@Core/services/list/getList.service';

export default function ({
    namespace,
    extraFilters = null,
}) {
    return {
        data() {
            return {
                items: {},
                codeFilter: '',
                isPrefetchingData: true,
            };
        },
        async fetch() {
            try {
                const {
                    defaultLanguageCode,
                } = this.$store.state.core;

                await this.getItems(defaultLanguageCode);

                this.isPrefetchingData = false;
            } catch (e) {
                if (this.$axios.isCancel(e)) {
                    return;
                }

                this.$addAlert({
                    type: ALERT_TYPE.ERROR,
                    message: 'List hasn’t been fetched properly',
                });
            }
        },
        methods: {
            async getItems(languageCode) {
                const filter = this.codeFilter
                    ? `code=${this.codeFilter};${extraFilters}`
                    : extraFilters;

                await getListItems({
                    $axios: this.$axios,
                    path: `${languageCode}/${namespace}`,
                    params: {
                        limit: 9999,
                        offset: 0,
                        filter,
                        view: 'list',
                        field: 'code',
                        order: 'ASC',
                    },
                    onSuccess: payload => this.onGetItemsSuccess({
                        ...payload,
                        languageCode,
                    }),
                });
            },
            onGetItemsSuccess({
                items,
                languageCode,
            }) {
                this.items = {
                    ...this.items,
                    [languageCode]: items,
                };
            },
        },
    };
}
